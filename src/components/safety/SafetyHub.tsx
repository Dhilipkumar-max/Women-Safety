import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Shield, Phone, MapPin, AlertTriangle, Plus, Heart } from 'lucide-react';
import { EmergencyContact } from '../../types';

interface SafetyHubProps {
  emergencyContacts: EmergencyContact[];
  onUpdateContacts: (contacts: EmergencyContact[]) => void;
}

export const SafetyHub: React.FC<SafetyHubProps> = ({
  emergencyContacts,
  onUpdateContacts
}) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    relationship: '',
    isPrimary: false
  });

  const handleEmergencyCall = (contact: EmergencyContact) => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handlePanicButton = () => {
    // In a real app, this would trigger emergency protocols
    if (emergencyContacts.length > 0) {
      const primaryContact = emergencyContacts.find(c => c.isPrimary) || emergencyContacts[0];
      if (confirm(`Emergency alert will be sent to ${primaryContact.name}. Continue?`)) {
        // Send emergency alert
        alert(`Emergency alert sent to ${primaryContact.name}!`);
      }
    } else {
      alert('Please add emergency contacts first.');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...contactData
    };
    onUpdateContacts([...emergencyContacts, newContact]);
    setContactData({ name: '', phone: '', relationship: '', isPrimary: false });
    setShowContactModal(false);
  };

  const deleteContact = (id: string) => {
    onUpdateContacts(emergencyContacts.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Safety Hub</h1>
        <p className="text-gray-600">Your safety is our priority</p>
      </div>

      {/* Emergency Panic Button */}
      <Card className="text-center">
        <div className="mb-4">
          <button
            onClick={handlePanicButton}
            className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 mx-auto flex items-center justify-center"
          >
            <AlertTriangle size={48} />
          </button>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Alert</h3>
        <p className="text-gray-600 mb-4">Press and hold to send emergency alert to your contacts</p>
        <p className="text-sm text-gray-500">This will send your location and emergency message</p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:scale-105 transition-transform">
          <div className="text-center">
            <Phone className="mx-auto text-blue-500 mb-2" size={32} />
            <h3 className="font-semibold text-gray-800 mb-1">Call 911</h3>
            <p className="text-sm text-gray-600">Emergency services</p>
          </div>
        </Card>

        <Card className="cursor-pointer hover:scale-105 transition-transform">
          <div className="text-center">
            <MapPin className="mx-auto text-green-500 mb-2" size={32} />
            <h3 className="font-semibold text-gray-800 mb-1">Share Location</h3>
            <p className="text-sm text-gray-600">Send to contacts</p>
          </div>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Emergency Contacts</h3>
          <Button onClick={() => setShowContactModal(true)} size="sm">
            <Plus size={16} className="mr-1" />
            Add Contact
          </Button>
        </div>

        <div className="space-y-3">
          {emergencyContacts.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-600">No emergency contacts added</p>
              <p className="text-gray-500 text-sm">Add trusted contacts for emergency situations</p>
            </div>
          ) : (
            emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-800">{contact.name}</p>
                    {contact.isPrimary && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEmergencyCall(contact)}
                    variant="secondary"
                    size="sm"
                  >
                    Call
                  </Button>
                  <Button
                    onClick={() => deleteContact(contact.id)}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Safety Tips */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <p className="text-gray-700">Always let someone know your location when going out</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <p className="text-gray-700">Keep your phone charged and accessible</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <p className="text-gray-700">Trust your instincts - if something feels wrong, seek help</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-gray-700">Consider carrying a personal safety device</p>
          </div>
        </div>
      </Card>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Add Emergency Contact">
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={contactData.name}
              onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <select
              value={contactData.relationship}
              onChange={(e) => setContactData(prev => ({ ...prev, relationship: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select relationship</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Partner">Partner</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPrimary"
              checked={contactData.isPrimary}
              onChange={(e) => setContactData(prev => ({ ...prev, isPrimary: e.target.checked }))}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="isPrimary" className="ml-2 text-sm font-medium text-gray-700">
              Set as primary emergency contact
            </label>
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setShowContactModal(false)} fullWidth>
              Cancel
            </Button>
            <Button type="submit" variant="danger" fullWidth>
              Add Contact
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};