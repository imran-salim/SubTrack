import './App.css'

function App() {  
  return (
    <>
      <h1>Welcome to SubTrack</h1>
      <div className="subs">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Plan</th>
              <th>Price</th>
              <th>Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Netflix</td>
              <td>Standard</td>
              <td>$13.99</td>
              <td>2024-07-15</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
            <tr>
              <td>Spotify</td>
              <td>Premium</td>
              <td>$9.99</td>
              <td>2024-07-20</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
