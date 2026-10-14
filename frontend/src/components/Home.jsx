function Home({ name, setName, onSubmit }) {
  return (
    <main className="welcome-page">
      <section className="welcome-panel" aria-labelledby="welcome-title">
        <p className="eyebrow">Open conversation</p>
        <h1 id="welcome-title">Find your voice.</h1>
        <p className="intro">
          Choose a name to enter the room and start chatting with everyone.
        </p>
        <form className="name-form" onSubmit={onSubmit}>
          <label htmlFor="name">Your name</label>
          <div className="name-input-row">
            <input
              id="name"
              className="text-input"
              type="text"
              // value={name}
              // onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Alex"
              autoComplete="name"
              autoFocus
              required
            />
            <button className="primary-button" type="submit">
              Enter chat
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Home;
