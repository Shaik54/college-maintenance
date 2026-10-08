from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    password2 = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "password2",
            "role",
        ]

    def validate(self, data):

        if data["password"] != data["password2"]:
            raise serializers.ValidationError({
                "password2": "Passwords do not match."
            })

        return data

    def create(self, validated_data):

        validated_data.pop("password2")

        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data.get("role", "student"),
        )

        return user