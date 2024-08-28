export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ... existing code ...

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updatedGame = req.body;

      // Update the game in the database
      const result = await db.collection('games').updateOne(
        { _id: new ObjectId(id as string) },
        { $set: updatedGame }
      );

      if (result.modifiedCount === 1) {
        // Fetch only the updated game
        const updatedGameData = await db.collection('games').findOne({ _id: new ObjectId(id as string) });
        res.status(200).json(updatedGameData);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
    } catch (error) {
      console.error('Error updating game:', error);
      res.status(500).json({ message: 'Error updating game' });
    }
  }

  // ... existing code for other HTTP methods ...
}