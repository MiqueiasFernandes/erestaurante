import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Cardapio } from './cardapio.model';
import { CardapioService } from './cardapio.service';

@Component({
    selector: 'jhi-cardapio-detail',
    templateUrl: './cardapio-detail.component.html'
})
export class CardapioDetailComponent implements OnInit, OnDestroy {

    cardapio: Cardapio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardapioService: CardapioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardapios();
    }

    load(id) {
        this.cardapioService.find(id).subscribe((cardapio) => {
            this.cardapio = cardapio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardapios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardapioListModification',
            (response) => this.load(this.cardapio.id)
        );
    }
}
