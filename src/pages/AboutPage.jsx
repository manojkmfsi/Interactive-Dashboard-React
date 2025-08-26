const AboutPage = () => {

  return <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
    <h2 className="text-3xl font-bold text-center">About This App</h2>
    <p>
      This interactive dashboard is a demonstration of key concepts in React development. It demonstarate:
    </p>
    <p className="text-xl font-bold">Pages / Views</p>
    <ul>
      <li>Home Page</li>
      <li>Item Detail Page</li>
      <li>Dashboard / Stats Page</li>
      <li>About / Info Page</li>
    </ul>
    <p className="text-xl font-bold">Dynamic Interaction Components</p>
    <ul>
      <li>Search/Filter Component</li>
      <li>Favorites Component</li>
      <li>Comment Box</li>
      <li>Interactive Chart</li>
    </ul>
    <p className="text-xl font-bold">State Management & Communication</p>
    <ul>
      <li>Component-level state: For search input, comment input, toggle buttons</li>
      <li>    Shared state: Favorites, selected item stats
      </li>
      <li>    Props drilling or Context API: For communication between Header, Home, and Favorites components
      </li>
    </ul>
    <p className="text-xl font-bold">Features</p>
    <ul>
      <li>Data fetching with fetch or axios</li>
      <li>Loading & error handling states</li>
      <li>Routing with React Router</li>
      <li>Favorites/bookmarks with shared state</li>
      <li>Dynamic charts & statistics</li>
      <li>Interactive comment section</li>
    </ul>
  </div>

}

export default AboutPage;