## Description

This is the frontend part of the Chat App, built using Next.js, Tailwind CSS, and Socket.IO client. It provides a user interface for the chat application, allowing users to interact with the real-time chat functionality provided by the [backend](https://github.com/ovaixe/chat-app-backend.git).

## Features

- User Authentication: Users can register a new account by providing a unique username, and password.
- Create Chat Room: Authenticated users can create new chat rooms by providing a unique room name.
- Join Existing Chat Room: Users can join existing chat rooms by entering the room name or selecting from a list of available rooms.
- Real-time Messaging: Users receive real-time updates when new messages are sent in the chat room.

## Installation

### Clone the repository:

```bash
$ git clone https://github.com/ovaixe/chat-app-frontend.git
```

### Install dependencies:

```bash
$ cd chat-app-frontend
$ npm install
```

### Set up environment variables:
#### Create a .env.local file in the root directory and configure the following variables:

```bash
# make sure backend is running on 8000 port
$ BACKEND_URL='http://localhost:8000'
$ NEXT_PUBLIC_SOCKET_URL='ws://localhost:8080'
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start
```

#### The application will be accessible at http://localhost:3000.

## Usage

- Ensure the backend server is running.
- Open the frontend application in your browser (http://localhost:3000 by default).
- Register a new user or log in using existing credentials.
- Create or join chat rooms and engage in real-time conversations.

## Contributing

If you'd like to contribute to this project, you are welcome.

## Stay in touch

- Author - [Bhat Owais](https://github.com/ovaixe)
- Website - [https://ovaixe.vercel.app](https://ovaixe.vercel.app)
- Twitter - [@ovaixe](https://twitter.com/ovaixe)

## License

This project is [MIT licensed](LICENSE).

## Acknowledgments

- Mention any libraries, frameworks, or tools you used.
- Provide credits to authors or contributors of external code.

Feel free to adapt this template further based on your project's specific needs.
