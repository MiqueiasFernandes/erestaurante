import { Injectable } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiEventManager } from 'ng-jhipster';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-oauth2.service';
import { JhiTrackerService } from '../tracker/tracker.service';

@Injectable()
export class LoginService {

    constructor(
        private eventManager: JhiEventManager,
        private languageService: JhiLanguageService,
        private principal: Principal,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                this.principal.identity(true).then((account) => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    if (account !== null) {
                        this.languageService.changeLanguage(account.langKey);
                    }
                    this.trackerService.sendActivity();
                    resolve(data);
                });
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    logout(nonotify? :boolean) {
        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout()
                .subscribe(
                () => {
                },
                () => {
                },
                () => {

                    if(nonotify) {
                        return;
                    }

                    this.eventManager.broadcast({
                        name: 'logout',
                        content: 'logout'
                    });
                }
            );
        }
        this.principal.authenticate(null);
    }
}
