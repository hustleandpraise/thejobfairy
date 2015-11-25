module.exports = function (shipit) {

    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: './build',
            deployTo: './apps',
            repositoryUrl: 'https://github.com/hustleandpraise/thejobfairy.git',
            ignores: ['.git', 'node_modules'],
            rsync: ['--del'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa.pub',
            shallowClone: true
        },
        staging: {
            servers: 'root@178.62.85.145'
        }
    });

    shipit.task('deploy:publish', function () {
        return shipit.remote('cd ~/apps/current/').then((res) => {

            return shipit.remote('npm install').then((res) => {
                shipit.remote('knex migrate:latest')
                shipit.remote('forever start ./bin/www')
            });
                
        }).then((done) => {
            console.log(done)
        })
    });

    shipit.task('deploy:clean', function () {
        shipit.local('rm -rf ./build')
    });

};
