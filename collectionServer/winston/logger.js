const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');

// log foramt 
const { combine, timestamp, label, printf } = winston.format;

// 로그 파일 저장 경로 
const logDir = `${process.cwd()}/log`;

//log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

/**
 *   Log Level => 숫자 낮을 수록 priority 높음. 
 *  error: 0 , warn: 1 , info: 2 , http: 3 , verbose: 4 , debug: 5 , silly: 6 
*/
const logger = createLogger({ 
   format: combine(label({ label: "NODE_PROJECT" }), timestamp(), logFormat), 
   // winston format 
   transports: [
       new winstonDaily({ // log 파일 설정
         level: "info", // 심각도
         datePattern: "YYYY-MM-DD", // 날짜 형식
         dirname: logDir, // 디렉토리 파일
         filename: "%DATE%.log", // 파일이름 설정, %DATE% - 자동으로 날짜가 들어옴
         maxSize: "20m", // 로그파일 크기, 정의하지 않으면 데이터가 쌓이고, 제안하면 초과시 앞의 데이터를 지움
         maxFiles: "30d", // 최근 30일치 로그 파일만 보관
       }),
       new winstonDaily({ // 로그 파일 설정
         level: "error", // 심각도
         datePattern: "YYYY-MM-DD",
         dirname: logDir, // 디렉토리 파일 이름 설정
         filename: "%DATE%.error.log", // 파일이름 설정, 에러파일을 구분해 별도보관
         maxSize: "20m", // 로그파일 크기
         maxFiles: "30d", // 최근 30일치 로그 파일만 보관
       }),
     ],
});

if (process.env.NODE_ENV != "prod") { // NODE_ENV환경 설정가능, 환경이 prod가 아닐 경우(개발환경일 경우), process 모듈을 통해 터미널 창에 로그를 확인할 수 있도록 설정
   logger.add(
   new winston.transports.Console({
       format: winston.format.combine(
       winston.format.colorize(), // 로그 출력시 심각도에 따른 색상 추가.
       winston.format.simple() // 메세지 형태를 단순하게 설정, prod이 아닐 경우 폴더와 터미널창에서 로그를 확인할 수 있도록
       ),
   })
);
}​

module.exports = logger;