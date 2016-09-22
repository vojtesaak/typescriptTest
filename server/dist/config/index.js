'use strict';
var config = {
    env: null,
    initialize: function (environment) {
        if (!environment) {
            return;
        }
        else {
            this.env = environment;
        }
        var defaultConfig = require("./config.default");
        Object.assign(this, defaultConfig);
        try {
            var configuration = require("./config." + environment);
            Object.assign(this, configuration);
        }
        catch (e) {
            console.log("Failed to log configuration for ENV: " + environment);
        }
        return this;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config.initialize(process.env.NODE_ENV || 'development');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYixJQUFNLE1BQU0sR0FBRztJQUVkLEdBQUcsRUFBRSxJQUFJO0lBT1QsVUFBVSxZQUFFLFdBQW1CO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDO1lBQ0osSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQVksV0FBYSxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFcEMsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUF3QyxXQUFhLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUViLENBQUM7Q0FHRCxDQUFDO0FBR0Y7a0JBQWUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJjb25maWcvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cblxuY29uc3QgY29uZmlnID0ge1xuXG5cdGVudjogbnVsbCxcblxuXG5cdC8qKlxuXHQgKiBbaW5pdGlhbGl6ZSBkZXNjcmlwdGlvbl1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGVudmlyb25tZW50XG5cdCAqL1xuXHRpbml0aWFsaXplIChlbnZpcm9ubWVudDogc3RyaW5nKSB7XG5cblx0XHRpZiAoIWVudmlyb25tZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZW52ID0gZW52aXJvbm1lbnQ7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVmYXVsdENvbmZpZyA9IHJlcXVpcmUoYC4vY29uZmlnLmRlZmF1bHRgKTtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIGRlZmF1bHRDb25maWcpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGNvbmZpZ3VyYXRpb24gPSByZXF1aXJlKGAuL2NvbmZpZy4ke2Vudmlyb25tZW50fWApO1xuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWd1cmF0aW9uKTtcblxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gbG9nIGNvbmZpZ3VyYXRpb24gZm9yIEVOVjogJHtlbnZpcm9ubWVudH1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9XG5cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb25maWcuaW5pdGlhbGl6ZShwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
