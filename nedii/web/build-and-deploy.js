/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const { exit } = require('process');
const replace = require('replace');

// Editable variables
const name = 'nedii';
const host = 'nedii.iguzman.com.mx';
const apiURL = 'https://api.nedii.iguzman.com.mx/v1/';
// const apiURLProd = 'https://api.nedii.com.mx/v1/';
const registry = 'christopherguzman';
// Editable variables

// const args = process.argv;
// const isProduction = args && args.length &&
//   args.length === 3 && args[2] === '--production' ? true : false;

let branch = '';
const startTime = new Date(Date.now());

const replaceWraper = (regex, replacement, file) => {
  replace({
    regex: regex,
    replacement: replacement,
    paths: [file],
    recursive: false,
    silent: true
  });
};

const setEnvValues = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Set Env values =========');
    // replaceWraper('http://localhost:8000/v1/', apiURL, '.env');
    // replaceWraper('branch-name', 'apiURL', '.env');
    exec(`echo REACT_APP_API_URL=${apiURL} > .env`, (err) => {
      if (err) return rej(err);
      exec(`echo REACT_APP_BRANCH_NAME=${branch} >> .env`, (err) => {
        if (err) return rej(err);
        exec(`echo REACT_APP_PRODUCTION=${true} >> .env`, (err) => {
          if (err) return rej(err);
          res(true);
        });
      });
    });
  });
};

const buildAppDistFiles = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Build App Distribution Files =========');
    exec('npm run build', (err, stdout) => {
      if (err) return rej(err);
      console.log('\nDistribution Files created!');
      res(stdout);
    });
  });
};

const cleanAPKCache = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Clean APK Cache =========');
    exec('rm -rf android/www', (err, stdout) => {
      if (err) return rej(err);
      console.log('\nAPK cache cleaned!');
      res(stdout);
    });
  });
};

const createWWWDir = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Create WWW Directory =========');
    exec('cp -r build android/www', (err, stdout) => {
      if (err) return rej(err);
      console.log('\nWWW directory created!');
      res(stdout);
    });
  });
};

const prepareAPKIndex = () => {
  return new Promise((res) => {
    console.log('\n========= Prepare APK Index =========');
    replaceWraper('\/static/', 'static/', './android/www/index.html');
    replaceWraper('\/assets/', 'assets/', './android/www/index.html');
    replaceWraper('{{seo.title}}', 'title', './android/www/index.html');
    replaceWraper('{{seo.og_description}}', 'og_description', './android/www/index.html');
    replaceWraper('{{seo.keywords}}', 'keywords', './android/www/index.html');
    replaceWraper('{{seo.og_site_name}}', 'og_site_name', './android/www/index.html');
    replaceWraper('{{seo.url}}', 'url', './android/www/index.html');
    replaceWraper('{{seo.img_og_picture}}', 'img_og_picture', './android/www/index.html');
    replaceWraper('{{{escapeJS data}}}', '', './android/www/index.html');
    res(true);
  });
};

const buildAPK = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Build APK =========');
    exec('cd android && cordova build android', (err, stdout) => {
      if (err) return rej(err);
      console.log('\nAPK created!');
      res(stdout);
    });
  });
};

const copyAPK = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Copy APK =========');
    exec('cp android/platforms/android/app/build/outputs/apk/debug/app-debug.apk build/static/app.apk', (err, stdout) => {
      if (err) return rej(err);
      console.log('\nAPK copied!');
      res(stdout);
    });
  });
};

const removeCordovaReference = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Remove Cordova Reference =========');
    replaceWraper('./cordova.js', '', './build/index.html');
    res(true);
  });
};

const getBranchName = () => {
  return new Promise((res, rej) => {
    exec('git branch --show-current', (err, stdout) => {
      if (err) return rej(err);
      const b = stdout.toString().replace(/(\r\n|\n|\r)/gm, '');
      branch = b;
      res(branch);
    });
  });
};

const tagDockerImage = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Tagging Docker Image =========');
    exec(`docker tag ${name} ${registry}/${name}:${branch}`, (err, stdout) => {
      if (err) return rej(err);
      console.log('\nDocker Image tagged!');
      res(stdout);
    });
  });
};

const publishDockerImage = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Publishing Docker Image =========');
    getBranchName()
      .then((branch) => {
        exec(`docker push ${registry}/${name}:${branch}`, (err, stdout) => {
          if (err) return rej(err);
          console.log('\nDocker Image published!');
          res(stdout);
        });
      })
      .catch((err) => {
        console.log('\nBuild Docker image error:', err);
      });
  });
};

const buildDockerImage = () => {
  return new Promise((res, rej) => {
    console.log('\n========= Building Docker Image =========');
    exec(`docker build -t ${name} .`, (err, stdout) => {
      if (err) return rej(err);
      console.log('\nDocker Image built');
      res(stdout);
    })
      .stdout.on('data', (data) => {
        console.log(data);
      })
      .on('data', (data) => {
        console.log(data);
      });
  });
};

const deleteDeployment = () => {
  return new Promise((res, rej) => {
    exec('helm delete nedii -n nedii', (err, stdout) => {
      if (err) return rej(err);
      res(stdout);
    });
  });
};

const deployMicroservice = () => {
  return new Promise((res, rej) => {
    exec(`helm install nedii deployment --namespace=nedii --set ingress.host=${host} --set image.tag=${branch}`, (err, stdout) => {
      if (err) return rej(err);
      res(stdout);
    });
  });
};

getBranchName()
  .then(() => setEnvValues())
  .then(() => buildAppDistFiles())
  .then(() => cleanAPKCache())
  .then(() => createWWWDir())
  .then(() => prepareAPKIndex())
  .then(() => buildAPK())
  .then(() => copyAPK())
  .then(() => removeCordovaReference())
  .then(() => buildDockerImage())
  .then(() => tagDockerImage())
  .then(() => publishDockerImage())
  .then(() => deleteDeployment())
  .then(() => deployMicroservice())
  .then(() => {
    const endTime = new Date(Date.now());
    const difference = (((endTime - startTime) / 100 ) / 60) / 60;
    console.log('\nProcess Complete!!');
    console.log('\nBranch:', branch);
    console.log('Starting time:', startTime);
    console.log('Ending time:', endTime);
    console.log('Processing time:', Math.round((difference + Number.EPSILON) * 100) / 100, 'minutes.');
    exit(0);
  })
  .catch((err) => {
    if ( err && err.response && err.response.statusText ) {
      console.log('\nError:', err.response.statusText);
    } else {
      console.log('\nError:', err);
    }
    exit(1);
  });
