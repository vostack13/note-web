class SV {
  constructor(store) {
    this._store = store;
    this._subscribers = {};
  }

  _createElement(tag, props, child) {
    const { className, onClick, ...otherProps} = props;

    const element = document.createElement(tag);
    element.className = className;
    element.onclick = onClick;
    element.append(child)

    return element;
  }

  getStore() {
    return this._store;
  }

  getSubscribers() {
    return this._subscribers;
  }

  updateStore(value) {
    if (value) {
      const store = this.getStore();
      const subscribers = this.getSubscribers();

      this._store = {...store, ...value}


      Object.entries(value).forEach(([key, itemValue]) => {
        if (subscribers[key]) {
          subscribers[key].forEach(
            subscriberCallback => subscriberCallback({[key]: itemValue})
          )
        }
      })
    }

    console.log('NEW STORE | ', this.getStore());
  }

  component(template) {
    return (state) => {
      const store = this.getStore();
      return template(state, store);
    }
  }

  mount(targetSelector, elemFn, props, selectors) {

    const render = (elem) => {
      const targetElem = document.querySelector(targetSelector);
      targetElem.innerHTML = '';
      targetElem.appendChild(elem);
    }

    const storeSelectors = selectors
      ? Object.entries(selectors).reduce((acc, [key, getValue]) => {
        const value = getValue(this.getStore());

        const rerenderFn = (newValue) => {
          render(elemFn({...props, ...newValue}))
        };

        this._subscribers[key] = this._subscribers[key]
          ? [...this._subscribers[key], rerenderFn]
          : this._subscribers[key] = [rerenderFn]

        return {...acc, [key]: value};
      }, {})

      : {}

    const preparedProps = {...props, ...storeSelectors};

    render(elemFn(preparedProps));
  }

  template(mapTemplate, ...props) {
    const template = mapTemplate.map((item, idx) => {
      if (!props[idx]) {
        return item
      }

      if (props[idx].nodeName !== undefined) {

        return `${item}${props[idx].outerHTML}`
      }

      return `${item}${props[idx]}`
    }).join('')

    const tempElem = document.createElement('i');
    tempElem.insertAdjacentHTML('beforeend', template);
    const fr = document.createDocumentFragment();

    fr.appendChild(tempElem.firstElementChild);
    return fr.childNodes[0];
  }

  ui() {
    return {
      div: (props, child) => this._createElement('div', props, child),
      button: (props, child) => this._createElement('button', props, child),
      li: (props, child) => this._createElement('li', props, child),
      ul: (props, child) => this._createElement('ul', props, child),


      fr: (...children) => {
        const fragment = document.createDocumentFragment();
        children.forEach(child => fragment.appendChild(child))
        return fragment;
      }
    }
  }
}
