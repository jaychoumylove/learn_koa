import {
    Configuration,
    configure,
    getLogger,
} from 'log4js'
import * as path from 'path'

const Levels = {
    ALL: 'ALL',
    TRACE: 'INFO',
    DEBUG: 'INFO',
    INFO: 'INFO',
    WARN: 'INFO',
    ERROR: 'INFO',
    FATAL: 'INFO',
}

const logConfig: Configuration = {
    appenders: {
        //debug日志
        debug: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd.log', //通过日期来生成文件
            alwaysIncludePattern: true, //文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/debug/'), //生成文件路径和文件名
        },
        //warn日志
        warn: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd.log', //通过日期来生成文件
            alwaysIncludePattern: true, //文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/warn/'), //生成文件路径和文件名
        },
        //错误日志
        error: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd.log', //通过日期来生成文件
            alwaysIncludePattern: true, //文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/error/'), //生成文件路径和文件名
        },
        //系统日志
        application: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd.log', //通过日期来生成文件
            alwaysIncludePattern: true, //文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join('logs/application/'), //生成文件路径和文件名
        },
        out: {
            type: 'console',
        },
    },
    categories: {
        default: { appenders: ['out'], level: Levels.ALL },
        debug: { appenders: ['debug'], level: Levels.DEBUG },
        warn: { appenders: ['warn'], level: Levels.WARN },
        error: { appenders: ['error'], level: Levels.ERROR },
        application: { appenders: ['application'], level: Levels.ALL },
    },
}

const initLogger = () => {
    configure(logConfig)
}

const getLoggerInterface = (type = 'default') => {
    const typeDict = Object.keys(logConfig.categories);
    if (typeDict.indexOf(type) < 0) {
        type = 'default'
    }
    return getLogger(type)
}

const writeLog = (log, type = 'info') => {
    const typeDict = ['error', 'debug', 'warn']
    if (typeDict.indexOf(type) > -1) {
        // log with specific types
        getLoggerInterface(type)[type](log)
    }
    // log all of types with 'application'
    getLoggerInterface('application')[type](log)
    // output to console
    getLoggerInterface()[type](log)
}

const writeErrorLog = (log) => {
    writeLog(log, 'error')
}
const writeDebugLog = (log) => {
    writeLog(log, 'debug')
}
const writeInfoLog = (log) => {
    writeLog(log, 'info')
}
const writeWarnLog = (log) => {
    writeLog(log, 'warn')
}

export {
    getLoggerInterface,
    initLogger,
    writeWarnLog,
    writeErrorLog,
    writeInfoLog,
    writeDebugLog,
    writeLog,
}
