var React = require('react');
var Field = require('../field').component;
var Text = require('../display/text').component;
var Button = require('../button/action').component;
var List = require('../list');
var fieldComponentBehaviour = require('./field-component-behaviour');

var assign = require('object-assign');
module.exports = {
  mixins: [fieldComponentBehaviour],
/**
 * Create a field for the given property metadata.
 * @param {string} name - property name.
 * @param {object} options - An object which contains all options for the built of the field.
 * @returns {object} - A React Field.
 */
fieldFor: function(name, options) {
  options = assign({}, options);
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
},
/**
 * Select component for the component.
 * @param {string} name - property name.
 * @param {string} listName - list name.
 * @param {object} options - options object.
 * @returns {object} - A React Field.
 */
selectFor: function(name, listName, options){
  options = options || {};
  options.listName = listName || options.listName;
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
},
/**
 * Display a field.
 * @param {string} name - property name.
 * @param {object} options - options object.
 * @returns {object} - A React Field.
 */
displayFor: function displayFor(name, options){
  options = options || {};
  options.isEdit = false;
  var fieldProps = this._buildFieldProps(name, options, this);
  return React.createElement(Field, fieldProps);
},
/**
 * Display the text for a given property.
 * @param {string} name  - property name.
 * @param {object} options - Option object
 * @returns {object} - A React component.
 */
textFor: function textFor(name, options){
  options = options || {};
  var def = (this.definition && this.definition[name]) ? this.definition[name] : {};
  return React.createElement(Text, {
    name: options.name || `${this.definitionPath}.${name}`,
    style: options.style,
    FieldComponent: def.FieldComponent,
    formatter: options.formatter || def.formatter,
    value: this.state[name]
  });
},
/**
 * Display a list component.
 * @param {string} name - Property name.
 * @param {object} options - Options object.
 * @returns {object} - The react component for the line.
 */
listFor: function listFor(name, options){
  options = options || {};
  options.reference = options.reference || this.state.reference;
  var listForProps = assign({}, options, {
    data: this.state[name],
    line: options.LineComponent || this.props.LineComponent || this.LineComponent,
    perPage: options.perPage || 5,
    reference: options.reference,
    isEdit: options.isEdit !== undefined ? options.isEdit : false
  });
  return React.createElement(List, listForProps);
},
/**
 * Button delete generation.
 * @returns {object} - A Reacte button.
 */
buttonDelete: function buttonDelete() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.delete',
    type: 'button',
    style: {className: 'delete'},
    handleOnClick: function handleOnClickEdit(){
      form.action.delete(form._getId());
    }
  });
},
/**
 * Edition button.
 * @returns {object} - The React component for the button.
 */
buttonEdit: function buttonEdit() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.edit',
    shape:'link',
    type: 'button',
    icon: 'pencil',
    handleOnClick: function handleOnClickEdit(){
      form.setState({isEdit: !form.state.isEdit});
    }
  });
},
/**
 * Cancel button.
 * @returns {object} - The React component for the button.
 */
buttonCancel: function buttonCancel() {
  var form = this;
  return React.createElement(Button, {
    label: 'button.cancel',
    shape:'link',
    type: 'button',
    icon: 'undo',
    handleOnClick: function handleOnClickCancel(){
      console.log('cancel icon');
      form.setState({isEdit: !form.state.isEdit});
    }
  });
},
/**
 * Button save generation.
 * @returns {object} - A React  save button.
 */
buttonSave: function() {
  //var form = this;
  return React.createElement(Button, {
    label: 'button.save',
    type: 'submit',
    shape:'link',
    icon: 'floppy-o'
    /*handleOnClick: function handleClickOnSave(e){
      if(form.validate()){
        form.action.save(form._getEntity());
      }
      return;
    }*/
  });
}};
