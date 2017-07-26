import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import $ from "jquery"

import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import scriptjs from 'scriptjs';
import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleDataEn from 'react-intl/locale-data/en';
import appLocaleDataZh from 'react-intl/locale-data/zh';
import { LocaleProvider } from 'antd';
import ZH_EN from './zh-en';

import { hashHistory, browserHistory, Router, Route, IndexRoute, IndexRedirect  } from 'react-router'
import 'antd/dist/antd.less'
import App from "./containers/app"
import Home from "./containers/home/"
import Projects from "./containers/projects/"
import Blog from "./containers/blog/"
import Service from "./containers/service/"
import About from "./containers/about/"

window.$ = $;

const param = location.hash.slice(2, 4) === "en" ? "en" : undefined;


const locale = param || 'zh';

const scripts = [];

if (!window.Intl) {
  scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${locale}.js`);
  scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js`);
  if (locale !== 'zh') {
    scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en-US.js`);
  }
}
scripts.push(`https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/${locale}.js`);
if (locale !== 'zh') {
  scripts.push(`https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/en.js`);
}

const ready = () => {

  addLocaleData(window.ReactIntlLocaleData[locale]);

  window.ZH_EN = ZH_EN;

  const defaultZH_EN = ZH_EN['zh'];

  ReactDOM.render(
    <LocaleProvider locale={locale === "en" ? antdEn : null}>
      <IntlProvider
        locale={locale}
        messages={ZH_EN[locale] || defaultZH_EN}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <IndexRedirect to="/home" />
            <Route path="/home" component={Home}></Route>
            <Route path="/en/home" component={Home}></Route>
            <Route path="/projects" component={Projects}></Route>
            <Route path="/en/projects" component={Projects}></Route>
            <Route path="/blog" component={Blog}></Route>
            <Route path="/en/blog" component={Blog}></Route>
            <Route path="/service" component={Service}></Route>
            <Route path="/en/service" component={Service}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/en/about" component={About}></Route>
          </Route>
        </Router>
      </IntlProvider>
    </LocaleProvider>,
    document.getElementById('root')
  )
};

if (scripts.length) {
  scriptjs(scripts, ready);
} else {
  ready();
}
