'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Serial = exports.PARITY_SPACE = exports.PARITY_MARK = exports.PARITY_ODD = exports.PARITY_EVEN = exports.PARITY_NONE = undefined;

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

var DEFAULT_PORT = '/dev/ttyAMA0';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJPLElBQU0sb0NBQWMsTUFBZDtBQUNOLElBQU0sb0NBQWMsTUFBZDtBQUNOLElBQU0sa0NBQWEsS0FBYjtBQUNOLElBQU0sb0NBQWMsTUFBZDtBQUNOLElBQU0sc0NBQWUsT0FBZjs7QUFFYixJQUFNLGVBQWUsY0FBZjs7QUFFTixJQUFNLE9BQU8sT0FBTyxNQUFQLENBQVA7QUFDTixJQUFNLFVBQVUsT0FBTyxTQUFQLENBQVY7QUFDTixJQUFNLGVBQWUsT0FBTyxjQUFQLENBQWY7QUFDTixJQUFNLFNBQVMsT0FBTyxRQUFQLENBQVQ7O0lBRU87OztBQUVYLFdBRlcsTUFFWCxHQUErRztxRUFBSixrQkFBSTs7MkJBQWpHLE9BQWlHO1FBQWpHLHFDQUFTLDJCQUF3Rjs2QkFBMUUsU0FBMEU7UUFBMUUseUNBQVcscUJBQStEOzZCQUF6RCxTQUF5RDtRQUF6RCx5Q0FBVyxrQkFBOEM7NkJBQTNDLFNBQTJDO1FBQTNDLHlDQUFXLGtCQUFnQzsyQkFBN0IsT0FBNkI7UUFBN0IscUNBQVMsMEJBQW9COzswQkFGcEcsUUFFb0c7O0FBQzdHLFFBQU0sT0FBTyxFQUFQLENBRHVHO0FBRTdHLFFBQUksU0FBUyxZQUFULEVBQXVCO0FBQ3pCLFdBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFEeUI7S0FBM0I7O3VFQUpTLG1CQU9ILE9BTHVHOztBQU03RyxVQUFLLElBQUwsSUFBYSxNQUFiLENBTjZHO0FBTzdHLFVBQUssT0FBTCxJQUFnQjtBQUNkLHdCQURjO0FBRWQsd0JBRmM7QUFHZCx3QkFIYztBQUlkLG9CQUpjO0tBQWhCLENBUDZHO0FBYTdHLFdBQU8sZ0JBQVAsUUFBOEI7QUFDNUIsWUFBTTtBQUNKLDRCQUFNO0FBQ0osaUJBQU8sTUFBUCxDQURJO1NBREY7O0FBSUosb0JBQVksSUFBWjtPQUpGO0FBTUEsZ0JBQVU7QUFDUiw0QkFBTTtBQUNKLGlCQUFPLFFBQVAsQ0FESTtTQURFOztBQUlSLG9CQUFZLElBQVo7T0FKRjtBQU1BLGdCQUFVO0FBQ1IsNEJBQU07QUFDSixpQkFBTyxRQUFQLENBREk7U0FERTs7QUFJUixvQkFBWSxJQUFaO09BSkY7QUFNQSxnQkFBVTtBQUNSLDRCQUFNO0FBQ0osaUJBQU8sUUFBUCxDQURJO1NBREU7O0FBSVIsb0JBQVksSUFBWjtPQUpGO0FBTUEsY0FBUTtBQUNOLDRCQUFNO0FBQ0osaUJBQU8sTUFBUCxDQURJO1NBREE7O0FBSU4sb0JBQVksSUFBWjtPQUpGO0tBekJGLEVBYjZHOztHQUEvRzs7ZUFGVzs7OEJBaUREO0FBQ1IsV0FBSyxLQUFMLEdBRFE7Ozs7eUJBSUwsSUFBSTs7O0FBQ1AsVUFBSSxLQUFLLE1BQUwsQ0FBSixFQUFrQjtBQUNoQixxQkFBYSxFQUFiLEVBRGdCO0FBRWhCLGVBRmdCO09BQWxCO0FBSUEsV0FBSyxZQUFMLElBQXFCLDJCQUFlLEtBQUssSUFBTCxDQUFmLEVBQTJCLEtBQUssT0FBTCxDQUEzQixDQUFyQixDQUxPO0FBTVAsV0FBSyxZQUFMLEVBQW1CLEVBQW5CLENBQXNCLE1BQXRCLEVBQThCLFlBQU07QUFDbEMsZUFBSyxZQUFMLEVBQW1CLEVBQW5CLENBQXNCLE1BQXRCLEVBQThCLFVBQUMsSUFBRCxFQUFVO0FBQ3RDLGlCQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCLEVBRHNDO1NBQVYsQ0FBOUIsQ0FEa0M7QUFJbEMsZUFBSyxNQUFMLElBQWUsSUFBZixDQUprQztBQUtsQyxhQUxrQztPQUFOLENBQTlCLENBTk87Ozs7MEJBZUgsSUFBSTtBQUNSLFVBQUksQ0FBQyxLQUFLLE1BQUwsQ0FBRCxFQUFlO0FBQ2pCLHFCQUFhLEVBQWIsRUFEaUI7QUFFakIsZUFGaUI7T0FBbkI7QUFJQSxXQUFLLE1BQUwsSUFBZSxLQUFmLENBTFE7QUFNUixXQUFLLFlBQUwsRUFBbUIsS0FBbkIsQ0FBeUIsRUFBekIsRUFOUTs7OzswQkFTSixNQUFNLElBQUk7QUFDZCxVQUFJLENBQUMsS0FBSyxNQUFMLENBQUQsRUFBZTtBQUNqQixjQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU4sQ0FEaUI7T0FBbkI7QUFHQSxXQUFLLFlBQUwsRUFBbUIsS0FBbkIsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0IsRUFKYzs7OztTQTdFTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE2IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AbmVicmkudXM+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IFBlcmlwaGVyYWwgfSBmcm9tICdyYXNwaS1wZXJpcGhlcmFsJztcbmltcG9ydCB7IFNlcmlhbFBvcnQgfSBmcm9tICdzZXJpYWxwb3J0JztcblxuZXhwb3J0IGNvbnN0IFBBUklUWV9OT05FID0gJ25vbmUnO1xuZXhwb3J0IGNvbnN0IFBBUklUWV9FVkVOID0gJ2V2ZW4nO1xuZXhwb3J0IGNvbnN0IFBBUklUWV9PREQgPSAnb2RkJztcbmV4cG9ydCBjb25zdCBQQVJJVFlfTUFSSyA9ICdtYXJrJztcbmV4cG9ydCBjb25zdCBQQVJJVFlfU1BBQ0UgPSAnc3BhY2UnO1xuXG5jb25zdCBERUZBVUxUX1BPUlQgPSAnL2Rldi90dHlBTUEwJztcblxuY29uc3QgcG9ydCA9IFN5bWJvbCgncG9ydCcpO1xuY29uc3Qgb3B0aW9ucyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuY29uc3QgcG9ydEluc3RhbmNlID0gU3ltYm9sKCdwb3J0SW5zdGFuY2UnKTtcbmNvbnN0IGlzT3BlbiA9IFN5bWJvbCgnaXNPcGVuJyk7XG5cbmV4cG9ydCBjbGFzcyBTZXJpYWwgZXh0ZW5kcyBQZXJpcGhlcmFsIHtcblxuICBjb25zdHJ1Y3Rvcih7IHBvcnRJZCA9IERFRkFVTFRfUE9SVCwgYmF1ZFJhdGUgPSA5NjAwLCBkYXRhQml0cyA9IDgsIHN0b3BCaXRzID0gMSwgcGFyaXR5ID0gUEFSSVRZX05PTkUgfSA9IHt9KSB7XG4gICAgY29uc3QgcGlucyA9IFtdO1xuICAgIGlmIChwb3J0ID09PSBERUZBVUxUX1BPUlQpIHtcbiAgICAgIHBpbnMucHVzaCgnVFhEMCcsICdSWEQwJyk7XG4gICAgfVxuICAgIHN1cGVyKHBpbnMpO1xuICAgIHRoaXNbcG9ydF0gPSBwb3J0SWQ7XG4gICAgdGhpc1tvcHRpb25zXSA9IHtcbiAgICAgIGJhdWRSYXRlLFxuICAgICAgZGF0YUJpdHMsXG4gICAgICBzdG9wQml0cyxcbiAgICAgIHBhcml0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBwb3J0OiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gcG9ydElkXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBiYXVkUmF0ZToge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGJhdWRSYXRlXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBkYXRhQml0czoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFCaXRzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBzdG9wQml0czoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0b3BCaXRzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBwYXJpdHk6IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBwYXJpdHlcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIG9wZW4oY2IpIHtcbiAgICBpZiAodGhpc1tpc09wZW5dKSB7XG4gICAgICBzZXRJbW1lZGlhdGUoY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzW3BvcnRJbnN0YW5jZV0gPSBuZXcgU2VyaWFsUG9ydCh0aGlzW3BvcnRdLCB0aGlzW29wdGlvbnNdKTtcbiAgICB0aGlzW3BvcnRJbnN0YW5jZV0ub24oJ29wZW4nLCAoKSA9PiB7XG4gICAgICB0aGlzW3BvcnRJbnN0YW5jZV0ub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpc1tpc09wZW5dID0gdHJ1ZTtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZShjYikge1xuICAgIGlmICghdGhpc1tpc09wZW5dKSB7XG4gICAgICBzZXRJbW1lZGlhdGUoY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzW2lzT3Blbl0gPSBmYWxzZTtcbiAgICB0aGlzW3BvcnRJbnN0YW5jZV0uY2xvc2UoY2IpO1xuICB9XG5cbiAgd3JpdGUoZGF0YSwgY2IpIHtcbiAgICBpZiAoIXRoaXNbaXNPcGVuXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gd3JpdGUgdG8gYSBjbG9zZWQgc2VyaWFsIHBvcnQnKTtcbiAgICB9XG4gICAgdGhpc1twb3J0SW5zdGFuY2VdLndyaXRlKGRhdGEsIGNiKTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
