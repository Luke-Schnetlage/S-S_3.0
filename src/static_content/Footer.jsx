export default function Home () {
  // returns the current year
  const year = new Date().getFullYear()

  return (
    <footer>
      <div>
        Developed by Mason Evans, Luke Schnetlage, Nicolas Towery &copy; {year}
      </div>
    </footer>
  )
}
