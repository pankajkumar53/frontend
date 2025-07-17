import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

interface ServiceProvider {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rating: number;
  isVerified: boolean;
  reviews: Array<{
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  workingHours: Array<{
    day: string;
    open: string;
    close: string;
    isOpen: boolean;
  }>;
  services: Array<{
    name: string;
    description: string;
    price: number;
    duration: number;
  }>;
}

const ServiceProviderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProvider();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchProvider = async () => {
    try {
      const response = await fetch(`http://localhost:3001/service-providers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProvider(data);
      } else {
        navigate('/service-providers');
      }
    } catch (error) {
      console.error('Error fetching provider:', error);
      navigate('/service-providers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Service provider not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-bold text-gray-900 mr-2">{provider.name}</h1>
                {provider.isVerified && (
                  <div className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>
              <p className="text-gray-600">{provider.serviceType}</p>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-semibold">{provider.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-gray-700">{provider.description}</p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{provider.address}, {provider.city}, {provider.state} {provider.zipCode}</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            {provider.workingHours && provider.workingHours.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Working Hours</h2>
                <div className="space-y-1">
                  {provider.workingHours.map((hours, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{hours.day}</span>
                      <span className="text-gray-600">
                        {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          {provider.services && provider.services.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">${service.price}</span>
                      <span className="text-gray-600">{service.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Reviews ({provider.reviews.length})</h2>
            {provider.reviews.length > 0 ? (
              <div className="space-y-4">
                {provider.reviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetail; 