import Field from '../field/Field';

export default class Multivalue extends Field {
  get defaultValue() {
    if (this.component.multiple) {
      return [super.defaultValue];
    }
    return super.defaultValue;
  }

  get addAnother() {
    return this.t(this.component.addAnother || ' Add Another');
  }

  render() {
    // If single value field.
    if (!this.component.multiple) {
      return super.render(`<div ref="element">${this.renderElement(this.dataValue)}</div>`);
    }

    // If multiple value field.
    return super.render(this.renderTemplate('multiValueTable', {
      rows: this.dataValue.map(this.renderRow.bind(this)).join(''),
      addAnother: this.addAnother,
    }));
  }

  renderRow(value, index) {
    return this.renderTemplate('multiValueRow', {
      index,
      element: `${this.renderElement(value, index)}`,
    });
  }

  hydrate(dom) {
    this.loadRefs(dom, {addButton: 'single', input: 'multiple', removeRow: 'multiple'});

    this.refs.input.forEach(this.hydrateElement.bind(this));
    this.refs.removeRow.forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', (event) => {
        event.preventDefault();
        this.removeValue(index);
      });
    });

    // If single value field.
    if (this.component.multiple) {
      this.addEventListener(this.refs.addButton, 'click', (event) => {
        event.preventDefault();
        this.addValue();
      });
    }

    super.hydrate(dom);
  }

  /**
   * Adds a new empty value to the data array.
   */
  addNewValue(value) {
    if (value === undefined) {
      value = this.emptyValue;
    }
    let dataValue = this.dataValue || [];
    if (!Array.isArray(dataValue)) {
      dataValue = [dataValue];
    }

    if (Array.isArray(value)) {
      dataValue = dataValue.concat(value);
    }
    else {
      dataValue.push(value);
    }
    this.dataValue = dataValue;
  }

  /**
   * Adds a new empty value to the data array, and add a new row to contain it.
   */
  addValue() {
    this.addNewValue();
    this.redraw();
    this.checkConditions(this.root ? this.root.data : this.data);
    this.restoreValue();
    if (this.root) {
      this.root.onChange();
    }
  }
}