package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Cardapio;

import com.mikeias.erestaurante.repository.CardapioRepository;
import com.mikeias.erestaurante.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cardapio.
 */
@RestController
@RequestMapping("/api")
public class CardapioResource {

    private final Logger log = LoggerFactory.getLogger(CardapioResource.class);

    private static final String ENTITY_NAME = "cardapio";

    private final CardapioRepository cardapioRepository;

    public CardapioResource(CardapioRepository cardapioRepository) {
        this.cardapioRepository = cardapioRepository;
    }

    /**
     * POST  /cardapios : Create a new cardapio.
     *
     * @param cardapio the cardapio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cardapio, or with status 400 (Bad Request) if the cardapio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cardapios")
    @Timed
    public ResponseEntity<Cardapio> createCardapio(@RequestBody Cardapio cardapio) throws URISyntaxException {
        log.debug("REST request to save Cardapio : {}", cardapio);
        if (cardapio.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cardapio cannot already have an ID")).body(null);
        }
        Cardapio result = cardapioRepository.save(cardapio);
        return ResponseEntity.created(new URI("/api/cardapios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cardapios : Updates an existing cardapio.
     *
     * @param cardapio the cardapio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cardapio,
     * or with status 400 (Bad Request) if the cardapio is not valid,
     * or with status 500 (Internal Server Error) if the cardapio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cardapios")
    @Timed
    public ResponseEntity<Cardapio> updateCardapio(@RequestBody Cardapio cardapio) throws URISyntaxException {
        log.debug("REST request to update Cardapio : {}", cardapio);
        if (cardapio.getId() == null) {
            return createCardapio(cardapio);
        }
        Cardapio result = cardapioRepository.save(cardapio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cardapio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cardapios : get all the cardapios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cardapios in body
     */
    @GetMapping("/cardapios")
    @Timed
    public List<Cardapio> getAllCardapios() {
        log.debug("REST request to get all Cardapios");
        return cardapioRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /cardapios/:id : get the "id" cardapio.
     *
     * @param id the id of the cardapio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cardapio, or with status 404 (Not Found)
     */
    @GetMapping("/cardapios/{id}")
    @Timed
    public ResponseEntity<Cardapio> getCardapio(@PathVariable Long id) {
        log.debug("REST request to get Cardapio : {}", id);
        Cardapio cardapio = cardapioRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cardapio));
    }

    /**
     * DELETE  /cardapios/:id : delete the "id" cardapio.
     *
     * @param id the id of the cardapio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cardapios/{id}")
    @Timed
    public ResponseEntity<Void> deleteCardapio(@PathVariable Long id) {
        log.debug("REST request to delete Cardapio : {}", id);
        cardapioRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
