package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Imposto;

import com.mikeias.erestaurante.repository.ImpostoRepository;
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
 * REST controller for managing Imposto.
 */
@RestController
@RequestMapping("/api")
public class ImpostoResource {

    private final Logger log = LoggerFactory.getLogger(ImpostoResource.class);

    private static final String ENTITY_NAME = "imposto";

    private final ImpostoRepository impostoRepository;

    public ImpostoResource(ImpostoRepository impostoRepository) {
        this.impostoRepository = impostoRepository;
    }

    /**
     * POST  /impostos : Create a new imposto.
     *
     * @param imposto the imposto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imposto, or with status 400 (Bad Request) if the imposto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/impostos")
    @Timed
    public ResponseEntity<Imposto> createImposto(@RequestBody Imposto imposto) throws URISyntaxException {
        log.debug("REST request to save Imposto : {}", imposto);
        if (imposto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new imposto cannot already have an ID")).body(null);
        }
        Imposto result = impostoRepository.save(imposto);
        return ResponseEntity.created(new URI("/api/impostos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /impostos : Updates an existing imposto.
     *
     * @param imposto the imposto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imposto,
     * or with status 400 (Bad Request) if the imposto is not valid,
     * or with status 500 (Internal Server Error) if the imposto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/impostos")
    @Timed
    public ResponseEntity<Imposto> updateImposto(@RequestBody Imposto imposto) throws URISyntaxException {
        log.debug("REST request to update Imposto : {}", imposto);
        if (imposto.getId() == null) {
            return createImposto(imposto);
        }
        Imposto result = impostoRepository.save(imposto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imposto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /impostos : get all the impostos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of impostos in body
     */
    @GetMapping("/impostos")
    @Timed
    public List<Imposto> getAllImpostos() {
        log.debug("REST request to get all Impostos");
        return impostoRepository.findAll();
        }

    /**
     * GET  /impostos/:id : get the "id" imposto.
     *
     * @param id the id of the imposto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imposto, or with status 404 (Not Found)
     */
    @GetMapping("/impostos/{id}")
    @Timed
    public ResponseEntity<Imposto> getImposto(@PathVariable Long id) {
        log.debug("REST request to get Imposto : {}", id);
        Imposto imposto = impostoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imposto));
    }

    /**
     * DELETE  /impostos/:id : delete the "id" imposto.
     *
     * @param id the id of the imposto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/impostos/{id}")
    @Timed
    public ResponseEntity<Void> deleteImposto(@PathVariable Long id) {
        log.debug("REST request to delete Imposto : {}", id);
        impostoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
