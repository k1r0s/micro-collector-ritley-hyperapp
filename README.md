### micro showcase (ritley - lowdb - hyperapp)

This micro stands for data collection. X company has the need to collect data from any user whom will browse the Frontend and fill up the form, which has several fields such as `Name`, `Email`[, `Comments`] and `File`.

Once this assets are validated a progress bar should appear to inform about upload progress, once upload has been fulfilled then we send rest associated data.

Backend should grab file chunks, arrange them all and then provide a `uid` which should be used on the following request to send last data.

All information will be saved into json database.

> Note that you have to create specific folders detailed on .gitkeep in order to let backend properly work
