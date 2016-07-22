desc = function(document_, cb) {
  var described = [];
  for (var prop in document_) {
    described.push({
      key: prop,
      type: type(document_[prop]),
      isID: (Object.prototype.toString.call(document_[prop]) === "[object Object]") ? true : undefined
    });
  }
  cb(described);
};

function type(content) {
  var typ = typeof content;
  switch (typ) {
    case 'string':
      return "string";
      break;
    case 'number':
      return "number";
      break;
    case 'boolean':
      return "boolean";
      break;
    case 'number':
      return "number";
      break;
    case 'object':
      var obj = Object.prototype.toString.call(content);
      switch (obj) {
        case "[object Timestamp]":
          return "timestamp"
          break;
        case "[object Date]":
          return "date"
          break;
        case "[object Double]":
          return "double"
          break;
        case "[object Array]":
          return "array"
          break;
        case "[object Object]":
          return "object"
          break;
        default:
      }
    default:
      return typeof content;
  }
}
