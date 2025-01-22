function Home() {
  return (
    <div>
      <main className="container my-2">
        <section className="bg-light py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-xxl-8">
                <div className="text-center my-5">
                  <h2 className="display-5 fw-bolder">
                    <span className="text-gradient d-inline">About the Project</span>
                  </h2>
                  <p className="lead fw-light mb-4">
                    Welcome to MERN CRUD with Admin Features!
                  </p>
                  <p className="text-muted">
                    This is a full-stack web application built using the MERN (MongoDB, 
                    Express.js, React.js, Node.js) stack. It is designed for managing users, 
                    providing functionalities to Create, Read, Update, and Delete users. 
                    Additionally, the application includes an admin panel where admins can 
                    activate or deactivate users, enhancing control and management capabilities.
                  </p>
                  <p className="text-muted">
                    The app follows the MVC (Model-View-Controller) architectural pattern and 
                    ensures secure and efficient data handling through token-based authentication 
                    and role-based authorization.
                  </p>
                  <div className="d-flex justify-content-center fs-2 gap-4">
                    <a className="text-gradient" href="#!" title="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a className="text-gradient" href="#!" title="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a className="text-gradient" href="#!" title="GitHub">
                      <i className="bi bi-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
  
}

export default Home;
