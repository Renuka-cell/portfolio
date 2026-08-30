from django.shortcuts import render
from django.http import JsonResponse

from .models import ContactMessage


def home(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")


        # Save message to database
        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )


        # Return JSON response to JavaScript
        return JsonResponse({
            "success": True
        })


    return render(request, "home.html")