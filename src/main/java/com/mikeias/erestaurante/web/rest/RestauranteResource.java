package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Restaurante;

import com.mikeias.erestaurante.repository.RestauranteRepository;
import com.mikeias.erestaurante.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Restaurante.
 */
@RestController
@RequestMapping("/api")
public class RestauranteResource {

    private final Logger log = LoggerFactory.getLogger(RestauranteResource.class);

    private static final String ENTITY_NAME = "restaurante";

    private final RestauranteRepository restauranteRepository;

    public RestauranteResource(RestauranteRepository restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
    }

    /**
     * POST  /restaurantes : Create a new restaurante.
     *
     * @param restaurante the restaurante to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restaurante, or with status 400 (Bad Request) if the restaurante has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restaurantes")
    @Timed
    public ResponseEntity<Restaurante> createRestaurante(@Valid @RequestBody Restaurante restaurante) throws URISyntaxException {
        log.debug("REST request to save Restaurante : {}", restaurante);
        if (restaurante.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new restaurante cannot already have an ID")).body(null);
        }
        Restaurante result = restauranteRepository.save(restaurante);
        return ResponseEntity.created(new URI("/api/restaurantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restaurantes : Updates an existing restaurante.
     *
     * @param restaurante the restaurante to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restaurante,
     * or with status 400 (Bad Request) if the restaurante is not valid,
     * or with status 500 (Internal Server Error) if the restaurante couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restaurantes")
    @Timed
    public ResponseEntity<Restaurante> updateRestaurante(@Valid @RequestBody Restaurante restaurante) throws URISyntaxException {
        log.debug("REST request to update Restaurante : {}", restaurante);
        if (restaurante.getId() == null) {
            return createRestaurante(restaurante);
        }
        Restaurante result = restauranteRepository.save(restaurante);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restaurante.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restaurantes : get all the restaurantes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restaurantes in body
     */
    @GetMapping("/restaurantes")
    @Timed
    public List<Restaurante> getAllRestaurantes() {
        log.debug("REST request to get all Restaurantes");
        return restauranteRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /restaurantes/:id : get the "id" restaurante.
     *
     * @param id the id of the restaurante to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restaurante, or with status 404 (Not Found)
     */
    @GetMapping("/restaurantes/{id}")
    @Timed
    public ResponseEntity<Restaurante> getRestaurante(@PathVariable Long id) {
        log.debug("REST request to get Restaurante : {}", id);
        Restaurante restaurante = restauranteRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(restaurante));
    }

    /**
     * DELETE  /restaurantes/:id : delete the "id" restaurante.
     *
     * @param id the id of the restaurante to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restaurantes/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestaurante(@PathVariable Long id) {
        log.debug("REST request to delete Restaurante : {}", id);
        restauranteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
