# Interview-Scheduler
This is a full-stack demo app for interview schedules management system built on Next JS/tailwind + Next APIs. This app would let you create interviews of more than one person and would also notify you if any person in the group is unavailable in the entered slot 😎.
You can also update a particular interview's time slot with above mentioned validation. 

Check it out here 👉🔗  : [LINK](https://the-scheduler.vercel.app/)

## Pages

```
/ - all interviews page
/create - create a new interview schedule
/update/[id] - update an interview schedule
```

![interviews-page](https://user-images.githubusercontent.com/57484457/146367740-d320cf87-6125-42e8-9c79-88055adca337.png)

![create](https://user-images.githubusercontent.com/57484457/146258222-f6a1f915-6f1b-4946-8f16-cec4dfb583e5.png) 

![error1](https://user-images.githubusercontent.com/57484457/146333112-babcd52c-97e8-46a8-8064-75ad384c80ac.png)

![error2](https://user-images.githubusercontent.com/57484457/146333118-c0492cbc-96c7-42d4-8a79-01896c8c21e7.png)

![update](https://user-images.githubusercontent.com/57484457/146258235-a162672e-fd89-43eb-ae65-b912eff55568.png)


## Get Started
Maintain a .env file and maintain your MongoDB URI as follows - 

```
MONGODB_URI = <your mongoDB uri>
```

Run the following command on your terminal -

```
yarn install
yarn dev
```

You are good to go!! ✈️

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).