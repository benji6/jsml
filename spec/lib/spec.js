var jsmlParse = require('../../lib/main.js');
var exampleTags = require('./tags.js');

var expectDomElementsToBeEquivalent = (a, b) => {
  expect(a.tagName).toEqual(b.tagName);
  expect(a.constructor).toBe(b.constructor);
};

var expectTextToBe = (domEl, text) => {
  expect(domEl.childNodes[0].nodeName).toBe("#text");
  expect(domEl.childNodes[0].nodeValue).toBe(text);
};

describe("jsmlParse", () => {
  it("returns a DOM element with the specified tag name when called with a single jsml object", () => {
    var jsmlObjects = exampleTags.map((tag) => {
      return {
        tag
      };
    });

    jsmlObjects.forEach((jsmlObject, index) => {
      expectDomElementsToBeEquivalent(jsmlParse(jsmlObject), document.createElement(exampleTags[index]));
    });
  });
  it("text: appends a textNode where text property is specified in jsml object", () => {
    var text = "Hello World!";
    var jsml = {
      tag: "p",
      text
    };
    var domEl = jsmlParse(jsml);

    expectTextToBe(domEl, text);
  });
  it("count: returns an array of DOM elements if count is specified", () => {
    var jsml = {
      count: 8,
      tag: "p"
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl) => {
      expectDomElementsToBeEquivalent(domEl, document.createElement("p"));
    });
  });
  it("count: passes count into attribute callbacks", () => {
    var jsml = {
      count: 8,
      tag: "p",
      text: (count) => count
    };
    var domEls = jsmlParse(jsml);

    domEls.forEach((domEl, index) => {
      expectTextToBe(domEl, String(index));
    });
  });
  it("children: when children property is a single jsml object a corresponding DOM element is created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: {
        tag: "p"
      }
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    expectDomElementsToBeEquivalent(domEl.children[0], document.createElement("p"));
  });
  it("children: when children property is an array of jsml objects corresponding DOM elements are created and appended to the parent DOM element", () => {
    var jsml = {
      tag: "div",
      children: exampleTags.map((tag) => {
        return {
          tag
        };
      }),
    };
    var domEl = jsmlParse(jsml);

    expectDomElementsToBeEquivalent(domEl, document.createElement("div"));
    // for (var i = 0; i < domEl.children.length; i++) {
    //   expectDomElementsToBeEquivalent(domEl.children[i], document.createElement(exampleTags[i]));
    // }
    // domEl.children.forEach((domEl) => {
    //   expectDomElementsToBeEquivalent(domEl, document.createElement(exampleTags[index]));
    // });
  });
  it("children & count: ", () => {

  });
  it("callback: ", () => {

  });
});
