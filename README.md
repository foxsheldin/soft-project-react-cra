# Описание задания

[Посмотреть проект можно тут (gh-pages)](https://foxsheldin.github.io/soft-project-react-cra)

## Задача

Используя API https://jsonplaceholder.typicode.com/guide/, необходимо сделать админскую панель для просмотра сущностей в этом API.

### Обязательный минимальный стек

React, react-router v6, redux, axios (библиотеки любые, redux-toolkit, redux-act, нативно…)

### Сущностей несколько:

1. Посты, к ним идут комментарии
2. Альбомы, к ним идут фотографии
3. Todos

### Необходимо сделать панель, где будет три вкладки:

1. Просмотр постов, с комментариями. Необходимо сделать древовидную структуру просмотра (как на любом форуме, пикабу, реддит и тд)
2. Просмотр альбомов, каждый альбом - это слайдер, слайды, фотки прикрепленные к альбому
3. Todos, там всего два состояния, сделать доску с двумя статусами (по completed) реализовать drug n drop по переносу с одной колонки в другую

### Библиотеки стилей

Можно использовать любую библиотеку стилей (Ant design, material, bootstrap).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
