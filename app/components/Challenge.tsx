"use client";
import styles from "../../styles/Challenge.module.css";
import { useRouter } from "next/navigation";

const Challenge = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        This page documents the challenges involved in the project and how each
        was solved.
      </p>
      <div className={styles.prerequisites}>
        <h2 className={styles.heading}>Prerequisites</h2>
        <p className={styles.text}>
          To run this project locally, ensure you have a `.env` file in the root
          directory with the following variables:
        </p>
        <ul className={styles.list}>
          <li>
            <code>MONGO_URL</code>: The connection string for your MongoDB
            database.
          </li>
          <li>
            <code>JWT_SECRET</code>: A secret key for generating and validating
            JSON Web Tokens.
          </li>
        </ul>
        <div className={styles.text}>
          Example:
          <pre className={styles.code}>
            MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/myDB
            <br />
            JWT_SECRET=mySuperSecretKey
          </pre>
        </div>
      </div>{" "}
      <h1 className={styles.title}>Challenge Overview</h1>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>1. Create a new React project</h2>
        <p className={styles.text}>
          The project was set up using <strong>Next.js</strong> for its powerful
          routing and server-side rendering capabilities. Modules such as
          `next/router` and `useState` were used for navigation and state
          management, respectively.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>2. Login Page</h2>
        <p className={styles.text}>
          A{" "}
          <strong>
            <span className={styles.link} onClick={() => router.push("/login")}>
              Login page
            </span>
          </strong>{" "}
          was created using a form with validation to ensure users input valid
          credentials. Successful login redirects users to the{" "}
          <strong>
            <span
              className={styles.link}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </span>
          </strong>{" "}
          page. Input validation and API integration were implemented. In
          addition to a{" "}
          <strong>
            <span
              className={styles.link}
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </strong>{" "}
          page.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>3. Dashboard Page</h2>
        <p className={styles.text}>
          The{" "}
          <strong>
            <span
              className={styles.link}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </span>
          </strong>{" "}
          displays data fetched from an API. React&apos;s `useEffect` was used
          to fetch the data, and a custom loader shows the loading state while
          the data is retrieved.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>4. Responsive Navbar</h2>
        <p className={styles.text}>
          A responsive <strong>Navbar</strong> was created using CSS Flexbox. It
          dynamically adjusts based on the user&apos;s logged-in state. The
          Navbar is rendered across all pages for consistent navigation.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>5. State Management</h2>
        <p className={styles.text}>
          The application state is managed using{" "}
          <strong>React Context API</strong>. The `AuthContext` provides state
          and methods to handle user authentication and logout.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>6. Loader</h2>
        <p className={styles.text}>
          A <strong>Loader</strong> component was created to show a spinner or
          loading text while fetching API data. It ensures a smooth user
          experience.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>7. Testing</h2>
        <p className={styles.text}>
          Unit and integration tests were written using <strong>Jest</strong>{" "}
          and <strong>React Testing Library</strong>. These tests cover edge
          cases and ensure that all critical functionality works as expected.
        </p>
      </div>
      <div className={styles.challengeSection}>
        <h2 className={styles.heading}>Bonus Challenges</h2>
        <ul className={styles.list}>
          <li>
            Logout functionality was implemented using the `logout` method in
            the `AuthContext`.
          </li>
          <li>
            API for login and registration was built using Node.js and MongoDB.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Challenge;
