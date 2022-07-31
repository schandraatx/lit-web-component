import { LitElement, html, css } from "lit";

export class UsersList extends LitElement {
  static properties = {
    data: [],
    originalData: [],
  };

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  onKeyDown(event) {
    if (event.keyCode === 8) {
      this.resetState(event);
    }
  }

  resetState(event) {
    this.data = this.originalData.filter(user => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
    this.searchString = event.target.value;
  }
  handleChange(event) {
    this.resetState(event);
  }

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        };
        return response.json();
      })
      .then(data => {
        this.data = data;
        this.originalData = data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  static styles = css`
      * {
        font-size: 1em;
      }

      .simple-table {
          border: solid 1px #DDEEEE;
          border-collapse: collapse;
          border-spacing: 0;
          font: normal 13px Arial, sans-serif;
      }
      .simple-table thead th {
          background-color: #DDEFEF;
          border: solid 1px #DDEEEE;
          color: #336B6B;
          padding: 10px;
          text-align: left;
          text-shadow: 1px 1px 1px #fff;
      }
      .simple-table tbody td {
          border: solid 1px #DDEEEE;
          color: #333;
          padding: 10px;
          text-shadow: 1px 1px 1px #fff;
      }
    `;

  constructor() {
    super();
  }

  render() {
    if (!this.data) {
      return html`
            <h4>Loading...</h4>
        `;
    }
    return html`
        <div>
        <div>
          <input type="text" @input="${this.handleChange}" placeholder="Filter by Name"/>
        </div>
        <br/>
        <table class="simple-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>

        ${this.data.map((user) => html`<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`)}
        
        </tbody>
        </table>
        </div>
    `;
  }
}

customElements.define("users-list", UsersList);
