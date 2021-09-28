import {
    configure,
    getLogger,
    levels
} from 'log4js'
import path from 'path'

const logConfig = {
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
        //访问日志
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
        default: { appenders: ['out'], level: levels.ALL },
        debug: { appenders: ['debug'], level: levels.DEBUG },
        warn: { appenders: ['warn'], level: levels.WARN },
        error: { appenders: ['error'], level: levels.ERROR },
        application: { appenders: ['application'], level: levels.ALL },
    },
}

const initLogger = () => {
    configure(logConfig)
}

const initWithConsole = () => {
    configure(logConfig);
    function proxy(context, method, message) {
        return function() {
            method.apply(context, [message].concat(Array.prototype.slice.apply(arguments)))
        }
    }

    // cover Console
    console.log = proxy(this, writeInfoLog, 'Info: ')
    console.info = proxy(this, writeInfoLog, 'Info: ')
    console.warn = proxy(this, writeWarnLog, 'Warn: ')
    console.error = proxy(this, writeErrorLog, 'Error: ')
}

const getLoggerInterface = (_type = 'default') => {
    const typeDict = Object.keys(logConfig.categories);
    if (typeDict.indexOf(_type) < 0) {
        _type = 'default'
    }
    return getLogger(_type)
}

const writeLog = (_type, ...log) => {
    if (!_type) _type = 'info'
    // console.log(arguments)
    const typeDict = ['error', 'debug', 'warn']
    if (typeDict.indexOf(_type) > -1) {
        // log with specific types
        getLoggerInterface(_type)[_type](...log)
    }
    // log all of types with 'application'
    getLoggerInterface('application')[_type](...log)
    // output to console
    getLoggerInterface()[_type](...log)
}

const writeErrorLog = (...args) => {
    writeLog('error', ...args)
}
const writeDebugLog = (...args) => {
    writeLog('debug', ...args)
}
const writeInfoLog = (...args) => {
    writeLog('info', ...args)
}
const writeWarnLog = (...args) => {
    writeLog('warn', ...args)
}

module.exports = {
    getLoggerInterface,
    initLogger,
    initWithConsole,
    writeWarnLog,
    writeErrorLog,
    writeInfoLog,
    writeDebugLog,
    writeLog,
}