import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbusementConverter";
import { SqlErs_Reimbursement } from "../dto/sql-ers_reimbursement";

/**
 * Retreive all reimbursements from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a reimbursement by its id
 * @param id 
 */
export async function findById(id: number): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM project1.ers_reimbursement WHERE reimb_author = $1', [id]);
    // let reimbursement: SqlErs_Reimbursement = resp.rows[0];
    // if (reimbursement !== undefined) {
      return resp.rows.map(reimbursementConverter)
    // } else {
    //   return undefined;
    // }
  } finally {
    client.release();
  }
}

/**
 * Add a reimbursement to the DB including with the user.
 * @param reimbursement 
 */
export async function createReimbursement(reimbursement, id): Promise<number> {
  const client = await connectionPool.connect();
  try {

    console.log("============Entering the database!===========")
    const resp = await client.query(
      `INSERT INTO project1.ers_reimbursement 
        (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, CURRENT_TIMESTAMP, $2, $3, 3, $4)
        RETURNING reimb_id`, [+reimbursement.amount, reimbursement.description, id, reimbursement.type]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}


export async function approveReimbursement(id): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`UPDATE project1.ers_reimbursement
    SET reimb_resolved = CURRENT_TIMESTAMP, reimb_resolver = 14, reimb_status_id=1
    WHERE reimb_id = $1`, [id]);
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

export async function denyReimbursement(id): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`UPDATE project1.ers_reimbursement
    SET reimb_resolved = CURRENT_TIMESTAMP, reimb_resolver = 14, reimb_status_id=2
    WHERE reimb_id = $1`, [id]);
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}