class Definer {
  // member auth related
  static auth_err1 = "att: mongobd is failed";
  static auth_err2 = "att: no member with that mb_nick";
  static auth_err3 = "att: your credentials do not match";

  //general errors
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that params!";
  static general_err3 = "att: file upload error!";

  //productl errors
  static product_err1 = "att: product creation is failed!";
  static product_err2 = "att: there is no data with that params!";
  static product_err3 = "att: file upload error!";
}

module.exports = Definer;
