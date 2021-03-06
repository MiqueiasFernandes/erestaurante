package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Mesa;

import com.mikeias.erestaurante.repository.MesaRepository;
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
 * REST controller for managing Mesa.
 */
@RestController
@RequestMapping("/api")
public class MesaResource {

    private final Logger log = LoggerFactory.getLogger(MesaResource.class);

    private static final String ENTITY_NAME = "mesa";

    private final MesaRepository mesaRepository;

    public MesaResource(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    /**
     * POST  /mesas : Create a new mesa.
     *
     * @param mesa the mesa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mesa, or with status 400 (Bad Request) if the mesa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mesas")
    @Timed
    public ResponseEntity<Mesa> createMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to save Mesa : {}", mesa);
        if (mesa.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mesa cannot already have an ID")).body(null);
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.created(new URI("/api/mesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mesas : Updates an existing mesa.
     *
     * @param mesa the mesa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mesa,
     * or with status 400 (Bad Request) if the mesa is not valid,
     * or with status 500 (Internal Server Error) if the mesa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mesas")
    @Timed
    public ResponseEntity<Mesa> updateMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to update Mesa : {}", mesa);
        if (mesa.getId() == null) {
            return createMesa(mesa);
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mesa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mesas : get all the mesas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mesas in body
     */
    @GetMapping("/mesas")
    @Timed
    public List<Mesa> getAllMesas() {
        log.debug("REST request to get all Mesas");
        return mesaRepository.findAll();
        }

    /**
     * GET  /mesas/:id : get the "id" mesa.
     *
     * @param id the id of the mesa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mesa, or with status 404 (Not Found)
     */
    @GetMapping("/mesas/{id}")
    @Timed
    public ResponseEntity<Mesa> getMesa(@PathVariable Long id) {
        log.debug("REST request to get Mesa : {}", id);
        Mesa mesa = mesaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mesa));
    }

    /**
     * GET  /mesas/codigo/:codigo : get the codigo "id" mesa.
     *
     * @param codigo the codigo of the mesa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mesa, or with status 404 (Not Found)
     */
    @GetMapping("/mesas/codigo/{codigo}")
    @Timed
    public ResponseEntity<Mesa> getMesaBycodigo(@PathVariable String codigo) {
        log.debug("REST request to get Mesa by codigo: {}", codigo);
        Mesa mesa = mesaRepository.findOneByCodigo(codigo);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mesa));
    }

    /**
     * DELETE  /mesas/:id : delete the "id" mesa.
     *
     * @param id the id of the mesa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mesas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        log.debug("REST request to delete Mesa : {}", id);
        mesaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
