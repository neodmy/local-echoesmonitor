# Local Echoes Monitor

A simple program to monitor [Echoes](https://sourceforge.net/projects/echoes/) health. It runs a cron job looking for changes in an specific directory in order to assure that Echoes is generating files, assuming that Echoes has problems otherwise. In the latter case, an email will be send to report it.

Being developed with [Nodejs](https://nodejs.org), relying on external libraries such as [Nodemailer](https://nodemailer.com/about/) and [node-cron](https://www.npmjs.com/package/node-cron), it can be configured with some parameters as shown in [Configuration](#configuration) section.


# Table of Contents
- [Usage](#usage)
- [Configuration](#configuration)


# Usage

To start locally:
```
$ npm start
```

or create a docker image
```
$ npm run build
```
and run docker-compose


# Configuration

You can find a JSON file in src/config in which you can set the following parameters:

```json
{
    "senderInfo": {
        "service": "SMTP server",
        "auth": {
            "user": "email@example.com",
            "pass": "verysecurepassword"
        }
    },
    "reportEmails": [
        "emailtoreport1@example.com", "emailtoreport1@example.com"
    ],
    "checkPeriod": {
        "unit": "minute or hour",
        "value": 0
    },
    "directoryPath": "directory path to check"
}
```

## SenderInfo
```json
{
    "senderInfo": {
            "service": "Gmail",
            "auth": {
                "user": "email@gmail.com",
                "pass": "uniqueapppassword"
            }
        }
}
```
This is the sender email account information. That is, the account this app will be using when sending emails to. Please, refer to [Nodemailer well-known services](https://nodemailer.com/smtp/well-known/) to check supported services.

## ReportEmails
```json
{
    "reportEmails": [
            "emailtobereportedto1@example.com", "emailtobereportedto2@example.com"
        ]
}
```
Here you can provide several email user address to be reported with Echoes errors.

## CheckPeriod
```json
{
    "checkPeriod": {
            "unit": "minute",
            "value": 0
        }
}
```
This is the schedule mode for the cron monitor task. Unit accepts either **minute** or **hour**, and value must be a valid number (i.e. **0-23** with hour and **0-59** with minute). This creates a cron expression. For instance, unit: minute and value: 1 generates "*/value * * * *".

## DirectoryPath
```json
{
    "directoryPath": "directory path to check"
}
```
This is the path to be monitored. Echoes is supposed to create files in this path.