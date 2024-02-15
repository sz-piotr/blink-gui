// --- API ---

ui.button("Button text");

// label, value, initialValue
// maxLength - number
// validate - (string) => boolean
ui.textField();
ui.textControl(config, "stringProperty");

// label, value, initialValue
// min - number
// max - number
// step - number
// unit - string
// precision - number
// integer - boolean
ui.numberField();
ui.numberControl(config, "numberProperty");

// label, value, initialValue
// min - number | object | array
// max - number | object | array
// step - number | object | array
// unit - string | object | array
// precision - number | object | array
// integer - boolean | object | array
ui.vectorField(["x", "y", "z"]);
ui.vectorControl(config, "vectorProperty", ["x", "y", "z", "w"]);

// label, value, initialValue
ui.dropdownField(["one", "two", "three"]);
ui.dropdownField({ one: 1, two: 2, three: 3 });
ui.dropdownControl(config, "stringEnum", ["one", "two", "three"]);
ui.dropdownControl(config, "numberEnum", { one: 1, two: 2, three: 3 });

// label, value, initialValue
ui.radioField(["one", "two", "three"]);
ui.radioField({ one: 1, two: 2, three: 3 });
ui.radioControl(config, "stringEnum", ["one", "two", "three"]);
ui.radioControl(config, "numberEnum", { one: 1, two: 2, three: 3 });

// label, value, initialValue
ui.checkboxField();
ui.checkboxControl(config, "booleanProperty");

// label, value, initialValue
// format - hex_string | object_float | object_int | array_float | array_int
// alpha - boolean
ui.colorField("hex_string");
ui.colorControl(config, "colorProperty", "hex_string");

ui.autoControl(config, "autoProperty");
ui.autoControlSet(config);
