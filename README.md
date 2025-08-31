# audiophile

API specification is in `swagger.yml`. You may use https://editor.swagger.io/ to view the API spec.

## Running the app locally
To build and run the app locally, please install prerequisite tools:
- NodeJS version 22
- Docker engine
- Docker compose

and run:

```shell
corepack enable
yarn set version berry

cd backend
yarn
yarn build

cd ../frontend
yarn
yarn build

docker-compose up
```

## Using the app
Once your app is running, visit http://localhost:5173

![create root account](/docs/create-root.png)

When you visit the app for the first time, you can create the first user account.
This first user will have `admin` role which has the permission to add other users.

You may choose your own username for this first account. For me, I'll create an account with `root` as username.
Once created, you should see an admin dashboard.

![Admin dashboard](/docs/admin-dashboard.png)

Let's create a new user name `john` by clicking the `Create a new user` button in the admin dashboard.

![Create john](/docs/create-john.png)

Once `john` is created, let's login his account and upload some audio files.
You can do this by navigate back the landing page by clicking the `Home` button on the top navbar.

![Login john](/docs/login-as-john.png)

By the way, when a user logged in, a login session is created and will last for 10 minutes.
This session is identified by the `JSESSIONID` cookie set by the server.

The user dashboard is slightly different from that of admin.

![User dashboard](/docs/user-dashboard.png)

You can upload an audio file by clicking on the `Upload new file` button on the dashboard.

I've included a sample audio file in the `docs` folder of this repository name `lecon-1.mp3` just in case you need one.

![Upload audio](/docs/upload.png)

Once uploaded, you should see the file listed in the user dashboard.

By the way, you may notice there is a `tmp` folder created in this repository. 
That's where the server stores audio files uploaded by the users.

![Uploaded](/docs/uploaded.png)

Clicking on the file name in the dashboard will bring us to the audio player page.

![audio player](/docs/audio-player.png)

That's all i have.

## System architecture
This section discusses high level system design

### As is architecture
Since the requirement is Docker this is the design

![Architecture](/docs/architecture.png)

### Propose architecture
Serverless architecture in AWS platform. 
This design is simpler than the above (opinion) and lower cost to run in production.
It is event based and we save significant cost in computation service since we don't have to pay for a 24h running containers.
I said containers because in production usually we have at least 2 containers for availability.

![Propose architecture](/docs/propose-architecture.png)

## Software architecture
This section discusses low level software design.

### Frontend architecture

React component hierarchy:
```js
<ReactRouter>
    <AuthenticationContext>
        <PageLayout>
            {children}
        </PageLayout>
    </AuthenticationContext>
</ReactRouter>
```
Components named ending `*Page.jsx` are usually declared in `router.js`.

![Frontend architecture](/docs/frontend-architecture.png)

### Backend architecture

Abstraction layers:
- `Handlers` are entry points. Its responsibility is to implement business logic. 
Usually there's also a `Service` abstraction layer in between `Handler` and `Repository` but the app is small enough to cut down this layer.
- `Repository` abstracts away complexity of data storage and access. `Repository` is here so that `Handler` can give orders without knowing how to cook.
- `Clients` are low level drivers. In case we need to change database, we will need to modify `Repository`. 


![Backend architecture](/docs/backend-architecture.png)

## What can be done better?
Due to the time constraint, these are still in my todo list or how i normally do professionally.

- Unit test
  - Frontend: [React testing library](https://testing-library.com/)
  - Backend: [Jest](https://jestjs.io/)
- Functional/end-to-end/automated test (using [Playwright](https://playwright.dev/))
- Audio streaming. Instead of forcing the browser to download the whole audio file. We can respond to [range request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) in smaller chunks.
- Styling (CSS). Sorry for the cosmetics, but this is a minimum viable product that i'm ready to launch.
- Error handling especially in the frontend.
