# Country Searcher

## Environment Requirements

This project requires:

- **Node.js**: Version `>= 20.9.0`
- **npm**: Version `>= 10.1.0`

## Dependencies

Country Searcher utilizes the following dependencies:

- **@apollo/client** and **graphql**: For interacting with the GraphQL API.
- **tailwindcss**: For styling the application.

### Third-Party APIs

The application relies on external APIs to search for countries and retrieve weather information:

- [Countries GraphQL API](https://countries.trevorblades.com)
- [OpenWeather API](https://openweathermap.org/api)

### Limitations of the Countries GraphQL API

Please note the following limitations:

- Case-insensitive search is not supported.
- Population data and neighboring countries information are not provided.

## Setting Up Environment Variables

To configure the application, create a `.env` file containing the necessary environment variables. Refer to the `.env.example` file for a list of required variables.

### Obtaining an API Key for the Weather API

To fetch weather information, the application uses the [OpenWeather API](https://openweathermap.org/api). An API key is required for access.

To obtain a free API key:

1. Visit the [OpenWeather API site](https://openweathermap.org/api) and sign up.
2. After signing up, your API key will be generated automatically.
3. Please allow up to a couple of hours for the new API key to be activated and ready for use.

## Running the Application

Use the following commands to run the application:

```bash
# Start the Vite development server
npm run dev

# Run the linter
npm run lint

# Execute test cases
npm run test

# Build the application and run the preview
npm run build
npm run preview
```

## Architecture of the Application

### React framework

The application is built using React, a popular JavaScript library for building user interfaces, particularly single-page applications (SPAs).

By using the component-based architecture, React encourages reusability and maintainability of code. Each feature (like country search, details view, etc.) can be encapsulated in its own component. It also enhances performance by minimizing direct manipulations of the real DOM, leading to faster rendering and a smoother user experience.

### TypeScript

TypeScript is used as a superset of JavaScript that adds static type definitions.

It reduces runtime errors by catching type-related issues during development, which is crucial for maintaining code quality in larger applications. It alsop provides better tooling support, including autocompletion and type checking, which enhances productivity.

### GraphQL for Data Fetching

The application consumes the Countries GraphQL API to retrieve country data.

Clients can request exactly the data they need, reducing over-fetching and under-fetching issues common with REST APIs.

### RESTful API Integration

The application integrates with the OpenWeatherMap API to fetch weather information for country capitals.

By using different APIs for country data and weather, the application adheres to the principle of separation of concerns, making it easier to maintain.

### Styling with Tailwind CSS

Tailwind CSS is used for styling the application.

Tailwind CSS allows for rapid UI development by using utility classes, making it easy to create responsive designs without writing custom CSS. It also ensures a cohesive look and feel across the application, enhancing user experience.

### Responsive Design

The application is designed to be responsive, adapting to various screen sizes.

It ensures that users can access the application on different devices, increasing usability and reach. A responsive design can lead to higher user satisfaction and retention.

### Testing

The application includes unit tests to ensure reliability.

Automated tests help catch bugs early in the development process, leading to a more stable application. Tests also provide a safety net for future changes, ensuring existing functionality remains intact.

## Challenges

The task description was clear and straightforward, which made the development process relatively smooth. However, if I had to identify a challenge, it would be ensuring a consistent user experience across various devices. To address this, I adopted a mobile-first design approach and utilized Tailwind CSS for rapid prototyping. This strategy enabled quick iterations and ensured responsiveness without the need for extensive custom CSS.

## Improvements

### Framework Enhancement

Currently, the application is built using React without any additional framework. However, we could enhance it by adopting a robust, production-ready framework like Next.js, which offers valuable features such as server-side rendering, client-side rendering, caching, and routing.

### State Management Improvement

At present, shared state management between parent and child components relies on the parent component as an intermediary. While we could implement the React Context API or a third-party state management library like Redux, these may be excessive for a simple application of this nature.

### Enhanced Language Filter

The current language filter displays all available languages, which can be inconvenient for users trying to find and select their desired option. To improve usability, we could implement a search feature or, even better, an auto-suggestion feature to streamline the selection process.

### Cached REST API calls

Currently, the application uses the native fetch() API to call the weather API. However, we could consider using libraries like react-query or SWR to implement caching for the results.
