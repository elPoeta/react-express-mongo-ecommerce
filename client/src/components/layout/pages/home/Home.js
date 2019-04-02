import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Home.css';
class Home extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated &&
            this.props.auth.user.isAdmin &&
            this.props.auth.user.role === 'admin') {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
            <div>
                <section id="showcase" class="grid">
                    <div class="bg-image"></div>
                    <div class="content-wrap">
                        <h1>Welcome to eBike</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci eum error earum soluta voluptatum nisi laboriosam eos saepe asperiores dolorum.</p>
                        <a href="#section-b" class="btn">Read More</a>
                    </div>
                </section>

                <main id="main">

                    <section id="section-a" class="grid">
                        <div class="content-wrap">
                            <h2 class="content-title">eBike - Bicycle Store </h2>
                            <div class="content-text">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sint eligendi possimus? Unde officiis magnam laborum ipsa distinctio odio, vero dolores dicta aliquam aperiam repellendus. Perferendis officiis deserunt velit voluptas nobis sequi
          animi totam, accusantium, ex eius quia, natus quo?</p>
                            </div>
                        </div>
                    </section>

                    <section id="section-b" class="grid">
                        <ul>
                            <li>
                                <div class="card">
                                    <img src="https://images.unsplash.com/photo-1507150080056-79542bdb9c59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" />
                                    <div class="card-content">
                                        <h3 class="card-title">Urban Bike's</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum culpa neque quo eum et quasi velit voluptatum cum maiores exercitationem.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="card">
                                    <img src="https://images.unsplash.com/photo-1545058802-fb9dc00ad69c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" />
                                    <div class="card-content">
                                        <h3 class="card-title">Mountain Bike</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing el it. Nostrum culpa neque quo eum et quasi velit voluptatum cum maiores exercitationem.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="card">
                                    <img src="https://images.unsplash.com/photo-1543880471-023b5aa65071?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />
                                    <div class="card-content">
                                        <h3 class="card-title">BMX</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum culpa neque quo eum et quasi velit voluptatum cum maiores exercitationem.</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section id="section-c" class="grid">
                        <div class="content-wrap">
                            <h2 class="content-title">We handle all of your travel needs</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime nam rerum vel earum error fugiat cupiditate, dolore eius! Minus, explicabo.</p>
                        </div>
                    </section>
                    <section id="section-d" class="grid">
                        <div class="box">
                            <h2 class="content-title">Contact Us</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, suscipit. Rerum ducimus a quod, ut et voluptas obcaecati unde fuga.</p>
                            <p>contact@ebikesolutions.com</p>
                        </div>
                        <div class="box">
                            <h2 class="content-title">About Our Company</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio earum porro deserunt, deleniti, quae facere repudiandae, officiis est exercitationem nobis iusto doloremque! Soluta excepturi in aut suscipit amet temporibus quo?</p>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Home);

