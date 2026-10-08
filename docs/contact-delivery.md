# Contact Delivery

The Contact form sends JSON to FormSubmit's AJAX endpoint for
`naththaphrnh@gmail.com`. It does not open an email application and does not
embed an SMTP password or API secret in the frontend.

## Activation

1. Open the Contact page on the deployed website and submit a real message.
2. If AJAX returns an activation-required response, click the displayed
   activation-request button. This submits the entered form directly to the
   standard FormSubmit endpoint in a new tab, preserving the Contact page.
3. Complete any verification on FormSubmit's page, then check the recipient
   inbox and spam folder and confirm using the activation link.
4. Submit another message and verify that it arrives in the recipient inbox.

Until the recipient confirms activation, inbox delivery is not enabled.
Messages and sender details are processed by the external FormSubmit service.
The success message means that the service accepted the request, not that
delivery to the inbox has been verified.

The form prevents duplicate pending submissions, includes a hidden spam trap,
and times out after 20 seconds. Failed requests preserve the entered message.

Documentation: https://formsubmit.co/ajax-documentation
