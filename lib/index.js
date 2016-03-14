'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Serial = exports.DEFAULT_PORT = exports.PARITY_SPACE = exports.PARITY_MARK = exports.PARITY_ODD = exports.PARITY_EVEN = exports.PARITY_NONE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raspiPeripheral = require('raspi-peripheral');

var _serialport = require('serialport');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The MIT License (MIT)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2016 Bryan Hughes <bryan@nebri.us>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Permission is hereby granted, free of charge, to any person obtaining a copy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of this software and associated documentation files (the "Software"), to deal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               in the Software without restriction, including without limitation the rights
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               copies of the Software, and to permit persons to whom the Software is
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               furnished to do so, subject to the following conditions:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The above copyright notice and this permission notice shall be included in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var PARITY_NONE = exports.PARITY_NONE = 'none';
var PARITY_EVEN = exports.PARITY_EVEN = 'even';
var PARITY_ODD = exports.PARITY_ODD = 'odd';
var PARITY_MARK = exports.PARITY_MARK = 'mark';
var PARITY_SPACE = exports.PARITY_SPACE = 'space';

var DEFAULT_PORT = exports.DEFAULT_PORT = '/dev/ttyAMA0';

var port = Symbol('port');
var options = Symbol('options');
var portInstance = Symbol('portInstance');
var isOpen = Symbol('isOpen');

var Serial = exports.Serial = function (_Peripheral) {
  _inherits(Serial, _Peripheral);

  function Serial() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$portId = _ref.portId;
    var portId = _ref$portId === undefined ? DEFAULT_PORT : _ref$portId;
    var _ref$baudRate = _ref.baudRate;
    var baudRate = _ref$baudRate === undefined ? 9600 : _ref$baudRate;
    var _ref$dataBits = _ref.dataBits;
    var dataBits = _ref$dataBits === undefined ? 8 : _ref$dataBits;
    var _ref$stopBits = _ref.stopBits;
    var stopBits = _ref$stopBits === undefined ? 1 : _ref$stopBits;
    var _ref$parity = _ref.parity;
    var parity = _ref$parity === undefined ? PARITY_NONE : _ref$parity;

    _classCallCheck(this, Serial);

    var pins = [];
    if (port === DEFAULT_PORT) {
      pins.push('TXD0', 'RXD0');
    }

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Serial).call(this, pins));

    _this[port] = portId;
    _this[options] = {
      baudRate: baudRate,
      dataBits: dataBits,
      stopBits: stopBits,
      parity: parity
    };
    Object.defineProperties(_this, {
      port: {
        get: function get() {
          return portId;
        },

        enumerable: true
      },
      baudRate: {
        get: function get() {
          return baudRate;
        },

        enumerable: true
      },
      dataBits: {
        get: function get() {
          return dataBits;
        },

        enumerable: true
      },
      stopBits: {
        get: function get() {
          return stopBits;
        },

        enumerable: true
      },
      parity: {
        get: function get() {
          return parity;
        },

        enumerable: true
      }
    });
    return _this;
  }

  _createClass(Serial, [{
    key: 'destroy',
    value: function destroy() {
      this.close();
    }
  }, {
    key: 'open',
    value: function open(cb) {
      var _this2 = this;

      if (this[isOpen]) {
        setImmediate(cb);
        return;
      }
      this[portInstance] = new _serialport.SerialPort(this[port], this[options]);
      this[portInstance].on('open', function () {
        _this2[portInstance].on('data', function (data) {
          _this2.emit('data', data);
        });
        _this2[isOpen] = true;
        cb();
      });
    }
  }, {
    key: 'close',
    value: function close(cb) {
      if (!this[isOpen]) {
        setImmediate(cb);
        return;
      }
      this[isOpen] = false;
      this[portInstance].close(cb);
    }
  }, {
    key: 'write',
    value: function write(data, cb) {
      if (!this[isOpen]) {
        throw new Error('Attempted to write to a closed serial port');
      }
      this[portInstance].write(data, cb);
    }
  }]);

  return Serial;
}(_raspiPeripheral.Peripheral);
//# sourceMappingURL=data:application/json;base64,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QUFJO0FBQ2QsVUFBSSxDQUFDLEtBQUssTUFBTCxDQUFELEVBQWU7QUFDakIsY0FBTSxJQUFJLEtBQUosQ0FBVSw0Q0FBVixDQUFOLENBRGlCO09BQW5CO0FBR0EsV0FBSyxZQUFMLEVBQW1CLEtBQW5CLENBQXlCLElBQXpCLEVBQStCLEVBQS9CLEVBSmM7Ozs7U0E3RUwiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNiBCcnlhbiBIdWdoZXMgPGJyeWFuQG5lYnJpLnVzPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBQZXJpcGhlcmFsIH0gZnJvbSAncmFzcGktcGVyaXBoZXJhbCc7XG5pbXBvcnQgeyBTZXJpYWxQb3J0IH0gZnJvbSAnc2VyaWFscG9ydCc7XG5cbmV4cG9ydCBjb25zdCBQQVJJVFlfTk9ORSA9ICdub25lJztcbmV4cG9ydCBjb25zdCBQQVJJVFlfRVZFTiA9ICdldmVuJztcbmV4cG9ydCBjb25zdCBQQVJJVFlfT0REID0gJ29kZCc7XG5leHBvcnQgY29uc3QgUEFSSVRZX01BUksgPSAnbWFyayc7XG5leHBvcnQgY29uc3QgUEFSSVRZX1NQQUNFID0gJ3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUE9SVCA9ICcvZGV2L3R0eUFNQTAnO1xuXG5jb25zdCBwb3J0ID0gU3ltYm9sKCdwb3J0Jyk7XG5jb25zdCBvcHRpb25zID0gU3ltYm9sKCdvcHRpb25zJyk7XG5jb25zdCBwb3J0SW5zdGFuY2UgPSBTeW1ib2woJ3BvcnRJbnN0YW5jZScpO1xuY29uc3QgaXNPcGVuID0gU3ltYm9sKCdpc09wZW4nKTtcblxuZXhwb3J0IGNsYXNzIFNlcmlhbCBleHRlbmRzIFBlcmlwaGVyYWwge1xuXG4gIGNvbnN0cnVjdG9yKHsgcG9ydElkID0gREVGQVVMVF9QT1JULCBiYXVkUmF0ZSA9IDk2MDAsIGRhdGFCaXRzID0gOCwgc3RvcEJpdHMgPSAxLCBwYXJpdHkgPSBQQVJJVFlfTk9ORSB9ID0ge30pIHtcbiAgICBjb25zdCBwaW5zID0gW107XG4gICAgaWYgKHBvcnQgPT09IERFRkFVTFRfUE9SVCkge1xuICAgICAgcGlucy5wdXNoKCdUWEQwJywgJ1JYRDAnKTtcbiAgICB9XG4gICAgc3VwZXIocGlucyk7XG4gICAgdGhpc1twb3J0XSA9IHBvcnRJZDtcbiAgICB0aGlzW29wdGlvbnNdID0ge1xuICAgICAgYmF1ZFJhdGUsXG4gICAgICBkYXRhQml0cyxcbiAgICAgIHN0b3BCaXRzLFxuICAgICAgcGFyaXR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIHBvcnQ6IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBwb3J0SWRcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGJhdWRSYXRlOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gYmF1ZFJhdGVcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRhdGFCaXRzOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YUJpdHNcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHN0b3BCaXRzOiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gc3RvcEJpdHNcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHBhcml0eToge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcml0eVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgb3BlbihjYikge1xuICAgIGlmICh0aGlzW2lzT3Blbl0pIHtcbiAgICAgIHNldEltbWVkaWF0ZShjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXNbcG9ydEluc3RhbmNlXSA9IG5ldyBTZXJpYWxQb3J0KHRoaXNbcG9ydF0sIHRoaXNbb3B0aW9uc10pO1xuICAgIHRoaXNbcG9ydEluc3RhbmNlXS5vbignb3BlbicsICgpID0+IHtcbiAgICAgIHRoaXNbcG9ydEluc3RhbmNlXS5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzW2lzT3Blbl0gPSB0cnVlO1xuICAgICAgY2IoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKGNiKSB7XG4gICAgaWYgKCF0aGlzW2lzT3Blbl0pIHtcbiAgICAgIHNldEltbWVkaWF0ZShjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXNbaXNPcGVuXSA9IGZhbHNlO1xuICAgIHRoaXNbcG9ydEluc3RhbmNlXS5jbG9zZShjYik7XG4gIH1cblxuICB3cml0ZShkYXRhLCBjYikge1xuICAgIGlmICghdGhpc1tpc09wZW5dKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIGNsb3NlZCBzZXJpYWwgcG9ydCcpO1xuICAgIH1cbiAgICB0aGlzW3BvcnRJbnN0YW5jZV0ud3JpdGUoZGF0YSwgY2IpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
