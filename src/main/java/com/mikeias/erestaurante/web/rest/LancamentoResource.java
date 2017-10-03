package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Lancamento;

import com.mikeias.erestaurante.repository.LancamentoRepository;
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
 * REST controller for managing Lancamento.
 */
@RestController
@RequestMapping("/api")
public class LancamentoResource {

    private final Logger log = LoggerFactory.getLogger(LancamentoResource.class);

    private static final String ENTITY_NAME = "lancamento";

    private final LancamentoRepository lancamentoRepository;

    public LancamentoResource(LancamentoRepository lancamentoRepository) {
        this.lancamentoRepository = lancamentoRepository;
    }

    /**
     * POST  /lancamentos : Create a new lancamento.
     *
     * @param lancamento the lancamento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lancamento, or with status 400 (Bad Request) if the lancamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lancamentos")
    @Timed
    public ResponseEntity<Lancamento> createLancamento(@Valid @RequestBody Lancamento lancamento) throws URISyntaxException {
        log.debug("REST request to save Lancamento : {}", lancamento);
        if (lancamento.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new lancamento cannot already have an ID")).body(null);
        }
        Lancamento result = lancamentoRepository.save(lancamento);
        return ResponseEntity.created(new URI("/api/lancamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lancamentos : Updates an existing lancamento.
     *
     * @param lancamento the lancamento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lancamento,
     * or with status 400 (Bad Request) if the lancamento is not valid,
     * or with status 500 (Internal Server Error) if the lancamento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lancamentos")
    @Timed
    public ResponseEntity<Lancamento> updateLancamento(@Valid @RequestBody Lancamento lancamento) throws URISyntaxException {
        log.debug("REST request to update Lancamento : {}", lancamento);
        if (lancamento.getId() == null) {
            return createLancamento(lancamento);
        }
        Lancamento result = lancamentoRepository.save(lancamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lancamento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lancamentos : get all the lancamentos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lancamentos in body
     */
    @GetMapping("/lancamentos")
    @Timed
    public List<Lancamento> getAllLancamentos() {
        log.debug("REST request to get all Lancamentos");
        return lancamentoRepository.findAll();
        }

    /**
     * GET  /lancamentos/:id : get the "id" lancamento.
     *
     * @param id the id of the lancamento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lancamento, or with status 404 (Not Found)
     */
    @GetMapping("/lancamentos/{id}")
    @Timed
    public ResponseEntity<Lancamento> getLancamento(@PathVariable Long id) {
        log.debug("REST request to get Lancamento : {}", id);
        Lancamento lancamento = lancamentoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lancamento));
    }

    /**
     * DELETE  /lancamentos/:id : delete the "id" lancamento.
     *
     * @param id the id of the lancamento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lancamentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteLancamento(@PathVariable Long id) {
        log.debug("REST request to delete Lancamento : {}", id);
        lancamentoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
