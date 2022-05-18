# @ivlnwn/react-fetchable-reducer

## Description

A library that reduces the number of boiler plates that are written in the process of creating reducers, actions and selectors. There is also an API module that allows you to manage data received from the backend.

You can generate reducers of two types, `object` and `array`.

-   An `object` is a simple reducer that stores a single object.
-   The `array` of objects for which you have described the interface is stored in the array reducer.

[//]: # ()
[//]: # (## Classic reducer)

[//]: # ()
[//]: # (Designed to easily store application data)

[//]: # ()
[//]: # (<details>)

[//]: # (<summary>Usage</summary>)

[//]: # ()
[//]: # (### Create a reducer)

[//]: # ()
[//]: # (```ts)

[//]: # (import {ClassicReducer} from '@ivlnwn/react-fetchable-reducer';)

[//]: # ()
[//]: # (export interface User {)

[//]: # (    // ...)

[//]: # (})

[//]: # ()
[//]: # (export const userReducerName = 'USER';)

[//]: # ()
[//]: # (export const user = ClassicReducer.object.createReducer<User>&#40;{)

[//]: # (    reducerName: userReducerName,)

[//]: # (    initialData: {)

[//]: # (        // ...)

[//]: # (    },)

[//]: # (}&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### Creating Selectors)

[//]: # ()
[//]: # (```ts)

[//]: # (import {ClassicReducer} from '@ivlnwn/react-fetchable-reducer';)

[//]: # (import {RootState} from 'store';)

[//]: # (import {User} from './index';)

[//]: # ()
[//]: # (export const gameResultsSelectors = ClassicReducer.object.createSelectors<RootState, User>&#40;'user'&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### Performing actions)

[//]: # ()
[//]: # (```ts)

[//]: # (import store from 'store';)

[//]: # (import {ClassicReducer} from '@ivlnwn/react-fetchable-reducer';)

[//]: # (import {User, userReducerName} from 'store/user';)

[//]: # ()
[//]: # (store.dispatch&#40;)

[//]: # (    ClassicReducer.object.actions.update<User>&#40;userReducerName&#41;&#40;{)

[//]: # (        // ...)

[//]: # (    }&#41;,)

[//]: # (&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (</details>)

[//]: # ()
[//]: # (## Fetchable reducer)

[//]: # ()
[//]: # (Designed to store data that the application receives from the backend)

[//]: # ()
[//]: # (<details>)

[//]: # (<summary>Usage</summary>)

[//]: # ()
[//]: # (### Create a reducer)

[//]: # ()
[//]: # (```ts)

[//]: # (import {FetchableReducer} from '@ivlnwn/react-fetchable-reducer';)

[//]: # ()
[//]: # (export interface Order {)

[//]: # (    id: number;)

[//]: # (})

[//]: # ()
[//]: # (export const ordersReducerName = 'ORDERS';)

[//]: # ()
[//]: # (export const orders = FetchableReducer.createArrayReducer<Order>&#40;{)

[//]: # (    reducerName: ordersReducerName,)

[//]: # (    initialData: [],)

[//]: # (}&#41;;)

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (### Creating Selectors)

[//]: # ()
[//]: # (```ts)

[//]: # (import {FetchableReducer} from '@ivlnwn/react-fetchable-reducer';)

[//]: # (import {RootState} from 'store';)

[//]: # (import {Order} from './index';)

[//]: # ()
[//]: # (export const ordersSelectors = FetchableReducer.createArraySelectors<RootState, Order>&#40;'orders'&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### Performing actions)

[//]: # ()
[//]: # (```ts)

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (### Making an API request)

[//]: # ()
[//]: # (```ts)

[//]: # ()
[//]: # (```)

[//]: # ()
[//]: # (</details>)
