## Wanlong Secure Wellness Tracker

This is a secure wellness tracking server built with Node.js, Express, HTTPS.
It uses Helmet to apply security-related HTTP headers.

## Features

-- Runs on HTTPS with self-signed SSL certificates
-- Uses Helmet to set security headers like:

- Content-Security-Policy
- X-XSS-Options
- X-Frame-Options
  -- 2 JSON endpoints with proper cache control

## Install Dependencies

-- npm install express
-- npm install helmet

## Caching Strategy

-- '/' : No caching.
-- '/moods' : public data, cache for 5 min.
-- '/goals/:id' : private data, cache for 5 min.

## generate SSL certificate

To run the app securely over HTTPS, I generate a self-signed certiicate using OpenSSL. In production, a certificate from a trusted Certificate Authority would be requierd. Using HTTPS helps prevent data interception and attacks.

-- mkdir cert
-- openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365

## Lessons Learned

-- Learn how to manually set up HTTPS using self-signed certs.
I chose OpenSSL with a self-signed certificate for local development, I become familiar with the command line and found it efficient for testing HTTPS locally.
-- Implemented cache strategies.
I used public, max-age=300 for non-sensitive data like mood states. For user-specific data like goals, I used private to prevent caching on shared proxies. This balances speed and privacy.
-- Realized the importance of content security headers in real-world applicantions.
The headers from Helmet protect my app from clickjacking, XSS, and data injection attacks. The hardest part is understanding Content-Security-Policy, but Helmet provide a default.
