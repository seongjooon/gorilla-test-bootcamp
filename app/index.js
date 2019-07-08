// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

// Importing component templates
import appTemplate from 'app.ejs';
import babyTemplate from 'baby.ejs';
import grandBabyTemplate from 'grandBaby.ejs';

// Import Gorilla Module
import Gorilla from '../Gorilla';

// Creating Gorilla Component Instance with some data
const grandBaby = new Gorilla.Component(grandBabyTemplate, {
  content: 'I am a grand child'
});

// Creating Component Instance Method (Frequently used as event handler in template)
grandBaby.hello = function () {
  console.log('hello, I am a grand child.');
};

// Creating Gorilla Component Instance with some data and child component
const baby = new Gorilla.Component(babyTemplate, {
  name: 'I am a baby'
}, {
  grandBaby
});

baby.whatAreYou = function () {
  console.log('Hey, what are you?');
};

const app = new Gorilla.Component(appTemplate, {
  title: 'Gorilla Project'
}, {
  baby
});

app.handleMouseover = function () {
  console.log('I put my mouse over title');
};

app.handleClick = function () {
  console.log('I click app');
};

// Listening to component life cycle
app.on('AFTER_RENDER', () => console.log('2. app after render'));
app.on('BEFORE_RENDER', () => console.log('1. app before render'));

// Updating component data model
setTimeout(() => {
  app.title = '코딩 부트캠프 [바닐라코딩]: Gorilla Project';
  baby.name = 'BABY';
  grandBaby.content = 'I said I am a grand baby';
}, 3000);

// Initializing the app into DOM
Gorilla.renderToDOM(
  app,
  document.querySelector('#root')
);
