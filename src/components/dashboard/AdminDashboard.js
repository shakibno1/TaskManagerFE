import React, {Component} from 'react';

class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-20">
                                <div className="info-box bg-pink">
                                    <div className="content">
                                        <h2 className="text">Welcome To Task Manager</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
        );
    }
}
export default AdminDashboard;
