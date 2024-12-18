import axios from "axios";

console.log("api.js loaded successfully");

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response || err);
      
      let message = err.response?.data?.error?.message || "Unknown error occured";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Get a list of companies (optionally filtered by name). */
  static async getCompanies(name) {
    const data = name ? { name } : {};
    console.log("getCompanies called with:", data);
    let res = await this.request("companies", data);
    console.log("getCompanies response:", res);
    return res.companies;
  }

  /** Get a list of jobs. */
//   static async getJobs() {
//     let res = await this.request("jobs");
//     return res.jobs;
//   }
  /** Get a list of jobs (optionally filtered by title). */
static async getJobs(title) {
    const data = title ? { title } : {};
    let res = await this.request("jobs", data);
    console.log("Jobs response from API:", res);
    return res.jobs;
  }

  /** Apply for a job. */
  static async applyToJob(username, jobId) {
    if (!username || !jobId) {
      throw new Error("Username and jobId are required for applying to a job.");
    }
    console.log("Applying to job with:", { username, jobId });

    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  /** Login user and get token. */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Register a new user. */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get user profile. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile. */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
// let newToken;
// JoblyApi.token = newToken;

export default JoblyApi;