const { query } = require('../config/database');

async function getChatHistory(userId, limit = 50) {
  try {
    const username = await getUsernameByUserId(userId);
    if (!username) {
      console.log('getChatHistory: No username found for userId:', userId);
      return [];
    }

    const receptionistUsername = await getActiveReceptionist();
    console.log('getChatHistory: username=', username, 'receptionistUsername=', receptionistUsername);

    const sql = `
      SELECT 
        ch.sender,
        ch.receiver,
        ch.message,
        ch.file_path,
        ch.file_name,
        ch.file_type,
        ch.file_size,
        ch.created_at as timestamp
      FROM chat_history ch
      WHERE (ch.sender = ? AND ch.receiver = ?) OR (ch.sender = ? AND ch.receiver = ?)
      ORDER BY ch.created_at ASC
      LIMIT ?
    `;

    const params = [username, receptionistUsername, receptionistUsername, username, limit];
    console.log('getChatHistory SQL:', sql);
    console.log('getChatHistory params:', params);

    const results = await query(sql, params);
    console.log('getChatHistory: Found', results.length, 'messages');
    return results;
  } catch (error) {
    console.error('getChatHistory error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

async function saveMessage(sender, receiver, message, filePath = null, fileName = null, fileType = null) {
  try {
    const sql = `
      INSERT INTO chat_history (sender, receiver, message, file_path, file_name, file_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    await query(sql, [sender, receiver, message, filePath, fileName, fileType]);
    return true;
  } catch (error) {
    console.error('saveMessage error:', error);
    throw error;
  }
}

async function getUsernameByUserId(userId) {
  const sql = `SELECT username FROM user WHERE user_id = ? LIMIT 1`;
  const results = await query(sql, [userId]);
  return results.length > 0 ? results[0].username : null;
}

async function getActiveReceptionist() {
  try {
    const sql = `SELECT username FROM user WHERE role = 'Receptionist' AND status = 'Active' LIMIT 1`;
    const results = await query(sql);
    return results.length > 0 ? results[0].username : 'receptionist';
  } catch (error) {
    console.error('getActiveReceptionist error:', error);
    return 'receptionist';
  }
}

module.exports = { getChatHistory, saveMessage, getUsernameByUserId, getActiveReceptionist };

