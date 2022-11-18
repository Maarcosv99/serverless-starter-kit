<h1 align="center">🌍 Serverless Starter Kit</h1>
<p align="center">To quickly create microservices.</p>

## Clone the repository

```
git clone https://github.com/Maarcosv99/serverless-starter-kit .
```

### Requirements

- **Node.js**: `>= 14.x`
- **Typescript**: `>= 4.1.3`
- **Docker**: `>= 4.x`

## Features

- ⌨ **Typescript** powers static typing.
- 🔍 **Validation:** Body and queryStringParameters.
- ⚡ **CRUD Example:** To accelerate your productivity.
- ✅ **Tests:** Guarantee operation.

## Basic Usage

### 💻 Run locally:

<p>First, run docker so that all services are active.</p>

```
bash run.docker.sh
```

<p>Second, deploy locally.</p>

```
bash run.docker.deploy.sh
```

<p>To run the tests, you need the services active and deployed. Once configured, run the command below:</p>

```
bash run.docker.tests.sh
```

**🔅 If you want to deploy and test right away using just one command, run the code below:**

```
bash run.docker.deploy_and_test.sh
```

### 🚀 Deploy to AWS:

<p>Run the command below to deploy to the development stage.</p>

```
bash run.deploy.dev.sh
```

<p>Run the command below to deploy to the production stage.</p>

```
bash run.deploy.prod.sh
```

## 📁 Structure:

[Based on this article.](https://medium.com/itnext/microservices-with-serverless-framework-3a4ee4d721ed)

```
 └── 📂 src/
 │   └─── 📂 infrastructure/ # Databases, message buses, etc...
 │   └─── 📂 libraries/ # In here is where I keep shared libraries.
 │   └─── 📂 logic/ # Business logic based lambdas.
 │   └─── 📂 rest/ # Outward facing REST APIs
 │   └─── 📂 tests/ # Test settings.
 └── 📂 config/ # Serverless.yml settings code blocks
 └── 📂 helpers/ # Http requests and seed database scripts
```

## License:

[GNU Affero General Public License v3](https://www.gnu.org/licenses/agpl-3.0.en.html)