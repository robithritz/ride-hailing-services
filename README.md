# Ride Hailing App Part-1

This App divided into 3 services
1. Driver Tracker Service
2. Location Updater Service
3. Performance Monitor Service

This App use PostgreSQL as database system, so you have to make sure to have postgresql running on your system.


## Getting Started
```
npm install
npm run build
```

### Start First Service
```
export RH_DT_PORT=3001
npm run start-driver-tracker
```

### Start Second Service
```
export RH_LU_PORT=3002
npm run start-loc-updater
```

### Start Third Service
```
export RH_PM_PORT=3003
npm run start-pf-monitor
```